/* eslint-disable @typescript-eslint/no-var-requires */
import { Prodige } from '..';
import { ProdigeEvent } from '../interfaces/Event';
import * as fs from 'fs';
import { ProdigeHandler } from '../interfaces/Handler';

export const handleEvents = (client: Prodige): Promise<ProdigeHandler> => {
  return new Promise((resolve, reject) => {
    //Using the default events path or the events dir in the config
    const eventsDir = client.config.eventsDir
      ? `${client.dir}/${client.config.eventsDir}`
      : `${client.dir}/events`;
    if (!fs.existsSync(eventsDir)) fs.mkdirSync(eventsDir);
    const eventsFiles = fs
      .readdirSync(eventsDir)
      .filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    try {
      for (let i = 0; i < eventsFiles.length; i++) {
        const file = eventsFiles[i];
        const event: ProdigeEvent = require(`${eventsDir}/${file}`);

        if (!event.name || typeof event.name != 'string') {
          return reject({
            success: false,
            message: `You forgot to specify an event name in: ${file}`,
          });
        }
        if (!event?.run) {
          return reject({
            success: false,
            message: `You forgot to specify a run function in: ${file}`,
          });
        }

        client.events.set(event.name, event);
        client.on(event.name, event.run.bind(null, client));
      }
      resolve({ success: true });
    } catch (err) {
      return reject({ success: false, message: err });
    }
  });
};
