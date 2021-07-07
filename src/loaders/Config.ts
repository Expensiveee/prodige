import { Prodige } from '..';
import { ProdigeHandler } from '../interfaces/Handler';

export const handleConfig = async (client: Prodige): Promise<ProdigeHandler> => {
  return new Promise((resolve, reject) => {
    const config = client.config;
    if (!config.token || typeof config.token != 'string') {
      return reject({
        success: false,
        message: 'No "token" in config file',
      });
    }
    if (!config.prefix || typeof config.prefix != 'string') {
      return reject({
        success: false,
        message: 'No "prefix" in config file',
      });
    }
    if (config.sendErrorMessages && typeof config.sendErrorMessages != 'boolean') {
      return reject({
        success: false,
        message: 'sendErrorMessages must be a boolean',
      });
    }
    if (!config?.delErrorMessage || typeof config.delErrorMessage != 'number') {
      return reject({
        success: false,
        message: 'delErrorMessage must be a number (set to -1 for none)',
      });
    }
    client.console.success('Your config file is valid');
    resolve({ success: true });
  });
};
