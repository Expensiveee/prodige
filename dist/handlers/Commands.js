"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommands = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = __importStar(require("fs"));
const Permissions_1 = require("../enums/Permissions");
const ArgumentType_1 = require("../enums/ArgumentType");
const ChannelsType_1 = require("../enums/ChannelsType");
const handleCommands = (client) => {
    return new Promise((resolve, reject) => {
        var _a, _b, _c, _d, _e, _f, _g;
        //If a commandDir is specified in the config use it instead of the default dir
        const commandsDir = client.config.commandsDir
            ? `${client.dir}/${client.config.commandsDir}`
            : `${client.dir}/commands`;
        if (!fs.existsSync(commandsDir))
            fs.mkdirSync(commandsDir);
        const commandsFiles = fs
            .readdirSync(commandsDir)
            .filter(file => file.endsWith('.ts') || file.endsWith('.js'));
        try {
            for (let i = 0; i < commandsFiles.length; i++) {
                const file = commandsFiles[i];
                const command = (_a = require(`${commandsDir}/${file}`).default) !== null && _a !== void 0 ? _a : require(`${commandsDir}/${file}`);
                if (!command.name || typeof command.name != 'string') {
                    return reject({
                        success: false,
                        message: `You forgot to specify a command name in: ${file}`,
                    });
                }
                if (!command.run || typeof command.run != 'function') {
                    return reject({
                        success: false,
                        message: `You forgot to specify a run function in: ${file}`,
                    });
                }
                if (command.cooldown && !command.cooldown.delay) {
                    return reject({
                        success: false,
                        message: `You enabled cooldown in "${file}" but haven't specified a delay`,
                    });
                }
                if (command.cooldown && typeof ((_b = command.cooldown) === null || _b === void 0 ? void 0 : _b.delay) != 'number') {
                    return reject({
                        success: false,
                        message: `Cooldown delay in "${file}" must be a number`,
                    });
                }
                if (((_c = command.cooldown) === null || _c === void 0 ? void 0 : _c.roleBypass) && !Array.isArray(command.cooldown.roleBypass)) {
                    return reject({
                        success: false,
                        message: `Cooldown roleBypass in "${file}" must be an array of role ids (string)`,
                    });
                }
                if ((_d = command.cooldown) === null || _d === void 0 ? void 0 : _d.roleBypass) {
                    (_e = command.cooldown) === null || _e === void 0 ? void 0 : _e.roleBypass.forEach(roleBypassId => {
                        if (typeof roleBypassId != 'string') {
                            return reject({
                                success: false,
                                message: `"${roleBypassId}" in "${file}" must be a number`,
                            });
                        }
                    });
                }
                if (command.channels && !Array.isArray(command.channels)) {
                    return reject({
                        success: false,
                        message: `Channels in "${file}" must be an array of channel ids (string)`,
                    });
                }
                if (command.channels) {
                    command.channels.forEach(channelId => {
                        if (typeof channelId != 'string') {
                            return reject({
                                success: false,
                                message: `"${channelId}" in "${file}" must be a string`,
                            });
                        }
                    });
                }
                if (command.deleteMessage && typeof command.deleteMessage != 'boolean') {
                    return reject({
                        success: false,
                        message: `deleteMessage in "${file}" must a boolean`,
                    });
                }
                if (command.ownerOnly && typeof command.ownerOnly != 'boolean') {
                    return reject({
                        success: false,
                        message: `ownerOnly in "${file}" must be a boolean`,
                    });
                }
                if (command.ownerOnly && !client.config.ownerId) {
                    return reject({
                        success: false,
                        message: `You enabled ownerOnly in "${file}" but haven't set an ownerId in your config file`,
                    });
                }
                if (command.roles && !Array.isArray(command.roles)) {
                    return reject({
                        success: false,
                        message: `Roles in "${file}" must be an array of role ids (string)`,
                    });
                }
                if (command.roles) {
                    command.roles.forEach(roleId => {
                        if (typeof roleId != 'string') {
                            return reject({
                                success: false,
                                message: `"${roleId}" in "${file}" must be a string`,
                            });
                        }
                    });
                }
                if (command.permissions && !Array.isArray(command.permissions)) {
                    return reject({
                        success: false,
                        message: `Permissions in "${file}" must be an array of PermissionsFlags (string)`,
                    });
                }
                if (command.permissions) {
                    (_f = command.permissions) === null || _f === void 0 ? void 0 : _f.forEach(permission => {
                        if (typeof permission != 'string') {
                            return reject({
                                success: false,
                                message: `"${permission}" in "${file}" must be a string`,
                            });
                        }
                        else if (!Object.values(Permissions_1.ProdigePermissions).includes(permission)) {
                            return reject({
                                success: false,
                                message: `"${permission}" in "${file}" doesn't exist as a permission flag`,
                            });
                        }
                    });
                }
                if (command.aliases && !Array.isArray(command.aliases)) {
                    return reject({
                        success: false,
                        message: `Aliases in "${file}" must an array of strings`,
                    });
                }
                if (command.args && !Array.isArray(command.args)) {
                    return reject({
                        success: false,
                        message: `Args in "${file}" must an array of ProdigeArguments`,
                    });
                }
                if (command.args) {
                    command.args.forEach(arg => {
                        if (typeof arg.type == 'undefined') {
                            return reject({
                                success: false,
                                message: `Argument type of "${arg.name}" in "${file}" can't be undefined`,
                            });
                        }
                        if (!Object.values(ArgumentType_1.ProdigeArgumentType).includes(arg.type)) {
                            if (!Object.values(ChannelsType_1.ProdigeChannelType).includes(arg.type)) {
                                return reject({
                                    success: false,
                                    message: `Argument type "${arg.type}" of "${arg.name}" in "${file}" isn't a valid argument type`,
                                });
                            }
                        }
                    });
                }
                client.commands.set(command.name, command);
                if (command.aliases) {
                    (_g = command.aliases) === null || _g === void 0 ? void 0 : _g.forEach(aliase => {
                        if (typeof aliase == 'string') {
                            client.aliases.set(aliase, command.name);
                        }
                        else {
                            client.console.warn(`"${aliase}" in "${file}" was not added as an aliases. Must be a string`);
                        }
                    });
                }
            }
            if (client.commands.size == 0) {
                client.console.warn('0 command loaded');
            }
            else {
                client.console.success(`${client.commands.size} command(s) successfully loaded`);
            }
            resolve({ success: true });
        }
        catch (err) {
            return reject({ success: false, message: err });
        }
    });
};
exports.handleCommands = handleCommands;
