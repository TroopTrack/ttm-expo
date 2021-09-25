import { HttpError, post } from "ajaxian";
import Decoder, { succeed, string, field, number, nullable } from "jsonous";
import { Resource, resourceDecoder } from "../Resource/Types";
import Urls from "../utility/Urls";

export type AppyError = HttpError;

export interface SuccessfulLogin {
  token: string;
  id: number;
  username: string;
}

type SuccessfulLoginResource = Resource<SuccessfulLogin>;

export const successfulLoginDecoder: Decoder<SuccessfulLogin> = succeed({})
  .assign("token", field("token", string))
  .assign("id", field("id", number))
  .assign("username", field("username", string));

const successfulLoginResourceDecoder = resourceDecoder(successfulLoginDecoder);

export const login = (payload: { username: string; password: string }) =>
  post(Urls.JWT_ENPOINT)
    .withData(payload)
    .withDecoder(successfulLoginResourceDecoder.toJsonFn());
