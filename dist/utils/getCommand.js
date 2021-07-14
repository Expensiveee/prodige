"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommand = void 0;
const getCommand = (client, message, prefix) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (!message.content.startsWith(prefix) || message.author.bot)
        return { client, message };
    const plainArgs = message.content.slice(prefix.length).split(/ +/);
    const commandName = (_a = plainArgs === null || plainArgs === void 0 ? void 0 : plainArgs.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!commandName)
        return { client, message };
    const prodigeCommand = (_b = client.commands.get(commandName)) !== null && _b !== void 0 ? _b : client.commands.get((_c = client.aliases.get(commandName)) !== null && _c !== void 0 ? _c : '');
    if (!prodigeCommand)
        return { client, message };
    return {
        client,
        message,
        prodigeCommand,
        commandName,
        plainArgs,
        cooldown: client.cooldowns.get(`${message.author.id}_${prodigeCommand.name}`),
        //Mapping through the rolesBypass and checking for each one if the user has it.
        //Then checking if this array of booleans includes true
        cooldownBypass: ((_e = (_d = prodigeCommand.cooldown) === null || _d === void 0 ? void 0 : _d.roleBypass) === null || _e === void 0 ? void 0 : _e.map((id) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.has(`${BigInt(id)}`); }).includes(true)) || false,
        haveRequiredPermissions: (_f = prodigeCommand.permissions) === null || _f === void 0 ? void 0 : _f.map((perm) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(perm); }).includes(true),
        haveRequiredRoles: (_g = prodigeCommand.roles) === null || _g === void 0 ? void 0 : _g.map((roleId) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.has(`${BigInt(roleId)}`); }).includes(true),
        isOwner: (_j = (_h = client.config) === null || _h === void 0 ? void 0 : _h.ownerId) === null || _j === void 0 ? void 0 : _j.includes(message.author.id),
        inAllowedChannel: (_k = prodigeCommand.channels) === null || _k === void 0 ? void 0 : _k.map((id) => message.channel.id == `${BigInt(id)}`).includes(true),
        inDmChannel: message.channel.type == 'dm',
    };
};
exports.getCommand = getCommand;
