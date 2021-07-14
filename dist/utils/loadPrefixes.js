"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPrefixes = void 0;
const prefix_1 = require("./../schemas/prefix");
const mongoConnect_1 = require("./mongoConnect");
const loadPrefixes = (client) => {
    return new Promise((resolve, reject) => {
        if (!client.config.mongodbURI) {
            return resolve({ success: false, data: { error: 'No MongoDb URI' } });
        }
        mongoConnect_1.mongo(client.config.mongodbURI).then(async (mongoose) => {
            try {
                for (const guild of client.guilds.cache) {
                    const result = await prefix_1.prefixSchema.findOne({
                        _id: guild[1].id,
                    });
                    client.prefixes[guild[1].id] = (result === null || result === void 0 ? void 0 : result.prefix)
                        ? [result === null || result === void 0 ? void 0 : result.prefix]
                        : client.config.prefix;
                }
            }
            catch (err) {
                reject(err);
            }
            finally {
                mongoose.connection.close();
            }
        });
    });
};
exports.loadPrefixes = loadPrefixes;
