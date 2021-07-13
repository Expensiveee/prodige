"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMember = void 0;
const getMember = (message, arg) => {
    var _a;
    const id = arg.replace('<', '').replace('>', '').replace('!', '').replace('@', '');
    try {
        return (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(`${BigInt(id)}`);
    }
    catch (err) {
        return;
    }
};
exports.getMember = getMember;
