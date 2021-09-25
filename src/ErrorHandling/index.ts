import { HttpError } from 'ajaxian';
import { AppyError } from '../Appy';

export interface Error {
  kind: 'error';
  message: string;
}

export const error = (message: string): Error => ({
  kind: 'error',
  message,
});

export const handleAppyError = (error: AppyError): string => {
  switch (error.kind) {
    default:
      return handleHttpError(error);
  }
};

export const handleHttpError = (httpError: HttpError): string => {
  switch (httpError.kind) {
    case 'bad-url':
      return 'Your request could not be completed because the url was malformed.';
    case 'timeout':
      return 'Your request took to long to complete.';
    case 'network-error':
      return 'You are disconnected from the server.';
    case 'bad-status':
      // TODO: find some examples of 400 and 404 so we can handle those differently.
      return 'Your request failed.';
    case 'bad-payload':
      return 'The server responded with unexpected data.';
  }
};
