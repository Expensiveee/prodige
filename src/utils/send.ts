import { ProdigeError } from '../interfaces/Error';

export const sendError = (error: ProdigeError): void => {
  error.data.client.emit('prodigeError', error);
};
