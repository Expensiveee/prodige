"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommand = void 0;
const getCommand = (client, message) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (!message.content.startsWith(client.config.prefix) || message.author.bot)
        return { client, message };
    const plainArgs = message.content
        .slice(client.config.prefix.length)
        .split(/ +/);
    const commandName = (_b = (_a = plainArgs === null || plainArgs === void 0 ? void 0 : plainArgs.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
    const prodigeCommand = (_c = client.commands.get(commandName)) !== null && _c !== void 0 ? _c : client.commands.get((_d = client.aliases.get(commandName)) !== null && _d !== void 0 ? _d : '');
    if (!prodigeCommand)
        return { client, message };
    if (prodigeCommand.ownerOnly && message.author.id != `${client.config.ownerId}`)
        return { client, message };
    return {
        client,
        message,
        prodigeCommand,
        commandName,
        plainArgs,
        cooldown: client.cooldowns.get(`${message.author.id}_${prodigeCommand.name}`),
        //Mapping through the rolesBypass and checking for each one if the user has it.
        //Then checking if this array or booleans includes true
        cooldownBypass: ((_f = (_e = prodigeCommand.cooldown) === null || _e === void 0 ? void 0 : _e.roleBypass) === null || _f === void 0 ? void 0 : _f.map((id) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.has(`${BigInt(id)}`); }).includes(true)) || false,
        havePermissions: (_g = prodigeCommand.permissions) === null || _g === void 0 ? void 0 : _g.map((perm) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(perm); }).includes(true),
        haveRoles: (_h = prodigeCommand.roles) === null || _h === void 0 ? void 0 : _h.map((roleId) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.has(`${BigInt(roleId)}`); }).includes(true),
        allowedChannel: (_j = prodigeCommand.channels) === null || _j === void 0 ? void 0 : _j.map((id) => message.channel.id == `${BigInt(id)}`).includes(true),
    };
};
exports.getCommand = getCommand;
