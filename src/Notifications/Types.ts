import { Error } from '../ErrorHandling';
import { generateUUID } from '../Uuid';

export interface WarningAlert {
  kind: 'warning-alert';
  uuid: string;
  message: string;
}

export interface SuccessAlert {
  kind: 'success-alert';
  uuid: string;
  message: string;
}

export const successAlert = (message: string): SuccessAlert => ({
  kind: 'success-alert',
  uuid: generateUUID(),
  message,
});

export interface InfoAlert {
  kind: 'info-alert';
  uuid: string;
  message: string;
}

export interface ErrorAlert {
  kind: 'error-alert';
  uuid: string;
  error: Error;
}

export const errorAlert = (error: Error): ErrorAlert => ({
  kind: 'error-alert',
  error,
  uuid: generateUUID(),
});

export type FlashAlert = WarningAlert | SuccessAlert | InfoAlert | ErrorAlert;
