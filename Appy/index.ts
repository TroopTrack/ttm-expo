import { header, HttpError, post } from 'ajaxian';
import { ok } from 'resulty';
import { REACT_APP_APPLICATION_ID } from 'react-native-dotenv';
import { Minutes, minutes } from '@execonline-inc/time';
import Decoder, { succeed, string, field, number } from 'jsonous';

export type AppyError = HttpError;

const appId = REACT_APP_APPLICATION_ID;
const applicationIdHeader = header('application-id', appId);

export interface SuccessfulLogin {
  accessToken: string;
  expiresIn: Minutes;
  refreshToken: string;
  tokenType: string;
}

const minutesDecoder = new Decoder<Minutes>(value => {
  return number.decodeAny(value).andThen(v => ok(minutes(v)));
});

const successfulLoginDecoder: Decoder<SuccessfulLogin> = succeed({})
  .assign('accessToken', field('access_token', string))
  .assign('expiresIn', field('expires_in', minutesDecoder))
  .assign('refreshToken', field('refresh_token', string))
  .assign('tokenType', field('token_type', string));

export const login = (payload: { username: string; password: string }) =>
  post('https://trooptrack.com/jwt')
    .withHeader(applicationIdHeader)
    .withData(payload)
    .withDecoder(successfulLoginDecoder.toJsonFn());
