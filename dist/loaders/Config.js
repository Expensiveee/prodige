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
        if (config.sendErrorMessages && typeof config.sendErrorMessages != 'boolean') {
            return reject({
                success: false,
                message: 'sendErrorMessages must be a boolean',
            });
        }
        if (!(config === null || config === void 0 ? void 0 : config.delErrorMessage) || typeof config.delErrorMessage != 'number') {
            throw new Error('delErrorMessage must be a number (set to -1 for none)');
        }
        client.console.success('Your config file is valid');
        resolve({ success: true });
    });
};
exports.handleConfig = handleConfig;
