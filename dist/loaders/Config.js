"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConfig = void 0;
const handleConfig = async (client) => {
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
        client.console.success('Your config file is valid');
        resolve({ success: true });
    });
};
exports.handleConfig = handleConfig;
