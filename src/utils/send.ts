import { ProdigeError } from '../interfaces/Error';

export const sendError = (error: ProdigeError): void => {
  error.client.emit('prodigeError', error);
};
