"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommand = void 0;
const getCommand = (client, message, prefix) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
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
        cooldown: (_d = client.cooldowns.get(`${message.author.id}_${prodigeCommand.name}`)) !== null && _d !== void 0 ? _d : 0,
        //Mapping through the rolesBypass and checking for each one if the user has it.
        //Then checking if this array of booleans includes true
        cooldownBypass: (_g = (_f = (_e = prodigeCommand.cooldown) === null || _e === void 0 ? void 0 : _e.rolesBypass) === null || _f === void 0 ? void 0 : _f.map((id) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.has(`${BigInt(id)}`); }).includes(true)) !== null && _g !== void 0 ? _g : false,
        globalCooldown: (_k = client.globalCooldowns.get(`${(_j = (_h = message.guild) === null || _h === void 0 ? void 0 : _h.id) !== null && _j !== void 0 ? _j : message.channel.id}_${prodigeCommand.name}`)) !== null && _k !== void 0 ? _k : 0,
        haveRequiredPermissions: (_m = (_l = prodigeCommand.permissions) === null || _l === void 0 ? void 0 : _l.map((perm) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has(perm); }).includes(true)) !== null && _m !== void 0 ? _m : true,
        haveRequiredBotPermissions: (_p = !((_o = prodigeCommand.botPermissions) === null || _o === void 0 ? void 0 : _o.map((perm) => { var _a, _b; return (_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.permissions.has(perm); }).includes(false))) !== null && _p !== void 0 ? _p : true,
        haveRequiredRoles: (_r = (_q = prodigeCommand.roles) === null || _q === void 0 ? void 0 : _q.map((roleId) => { var _a; return (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.has(`${BigInt(roleId)}`); }).includes(true)) !== null && _r !== void 0 ? _r : true,
        isOwner: (_t = (_s = client.config) === null || _s === void 0 ? void 0 : _s.ownerId) === null || _t === void 0 ? void 0 : _t.includes(message.author.id),
        inAllowedChannel: (_v = (_u = prodigeCommand.channels) === null || _u === void 0 ? void 0 : _u.map((id) => message.channel.id == `${BigInt(id)}`).includes(true)) !== null && _v !== void 0 ? _v : true,
        inDmChannel: message.channel.type == 'dm',
    };
};
exports.getCommand = getCommand;
