import { HttpError, post } from 'ajaxian';
import Decoder, { succeed, string, field, number } from 'jsonous';
import { Resource, resourceDecoder } from '../Resource/Types';

export type AppyError = HttpError;

export interface SuccessfulLogin {
  accessToken: string;
  id: number;
  username: string;
}

type SuccessfulLoginResource = Resource<SuccessfulLogin>;

const successfulLoginDecoder: Decoder<SuccessfulLogin> = succeed({})
  .assign('accessToken', field('auth_token', string))
  .assign('id', field('id', number))
  .assign('username', field('username', string));

const successfulLoginResourceDecoder = resourceDecoder(successfulLoginDecoder);

export const login = (payload: { username: string; password: string }) =>
  post('https://trooptrack.com/jwt')
    .withData(payload)
    .withDecoder(successfulLoginResourceDecoder.toJsonFn());
