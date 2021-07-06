"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = void 0;
const getMessage = (message, id) => {
    try {
        return message === null || message === void 0 ? void 0 : message.channel.messages.cache.get(`${BigInt(id)}`);
    }
    catch (err) {
        return;
    }
};
exports.getMessage = getMessage;
