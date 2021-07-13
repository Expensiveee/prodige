"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = void 0;
const getChannel = (message, arg, type) => {
    var _a;
    const id = arg.replace('<', '').replace('>', '').replace('#', '');
    return (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(channel => channel.id === id && channel.type == type);
};
exports.getChannel = getChannel;
