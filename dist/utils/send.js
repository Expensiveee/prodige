"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
const sendError = (error) => {
    error.client.emit('prodigeError', error);
};
exports.sendError = sendError;
