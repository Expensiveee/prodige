"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
const sendError = (error) => {
    error.data.client.emit('prodigeError', error);
};
exports.sendError = sendError;
