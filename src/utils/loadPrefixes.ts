import { prefixSchema } from './../schemas/prefix';
import { Prodige } from '..';
import { mongo } from './mongoConnect';

export const loadPrefixes = (client: Prodige): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    mongo(client.config.mongodbURI).then(async mongoose => {
      try {
        for (const guild of client.guilds.cache) {
          const result: { _id: string; prefix: string } | undefined =
            await prefixSchema.findOne({
              _id: guild[1].id,
            });
          client.guildPrefixes[guild[1].id] = result?.prefix || client.config.prefix;
        }
      } catch (err) {
        reject(err);
      } finally {
        mongoose.connection.close();
      }
    });
  });
};
