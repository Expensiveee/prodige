import { Prodige } from '..';
import { ProdigeHandler } from '../interfaces/Handler';
import { mongo } from '../utils/mongoConnect';
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
    if (config.prefixPerServer && typeof config.prefixPerServer != 'boolean') {
      return reject({
        success: false,
        message: '"prefixPerServer" must be a boolean',
      });
    }

    if (config.prefixPerServer && !config.mongodbURI) {
      return reject({
        success: false,
        message: 'If "prefixPerServer" is set to true, "mongodbURI" is mandatory',
      });
    }

    if (config.mongodbURI && typeof config.mongodbURI != 'string') {
      return reject({
        success: false,
        message: '"mongodbURI" must be a string',
      });
    }

    if (config.mongodbURI && config.prefixPerServer) {
      mongo(config.mongodbURI)
        .then(mongoose => {
          mongoose.connection.close();
          resolve({ success: true });
          client.console.success('Your config file is valid');
        })
        .catch(err => {
          return reject({
            success: false,
            message: err,
          });
        });
    } else {
      resolve({ success: true });
      client.console.success('Your config file is valid');
    }
  });
};
