import { header, HttpError, post } from 'ajaxian';
import { ok } from 'resulty';
import { Minutes, minutes } from '@execonline-inc/time';
import Decoder, { succeed, string, field, number } from 'jsonous';
import { Resource, resourceDecoder } from '../Resource/Types';

export type AppyError = HttpError;

export interface SuccessfulLogin {
  accessToken: string;
  // expiry: Minutes;
  id: number;
  username: string;
}

const minutesDecoder = new Decoder<Minutes>(value => {
  return number.decodeAny(value).andThen(v => ok(minutes(v)));
});

type SuccessfulLoginResource = Resource<SuccessfulLogin>;

const successfulLoginDecoder: Decoder<SuccessfulLogin> = succeed({})
  .assign('accessToken', field('auth_token', string))
  // .assign('expiry', field('expiry', minutesDecoder))
  .assign('id', field('id', number))
  .assign('username', field('username', string));

const successfulLoginResourceDecoder = resourceDecoder(successfulLoginDecoder);

export const login = (payload: { username: string; password: string }) =>
  post('https://trooptrack.com/jwt')
    .withData(payload)
    .withDecoder(successfulLoginResourceDecoder.toJsonFn());
