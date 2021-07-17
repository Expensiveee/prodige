"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prodige = void 0;
const discord_js_1 = require("discord.js");
const Colors_1 = require("./enums/Colors");
const message_1 = require("./events/message");
const Commands_1 = require("./handlers/Commands");
const Events_1 = require("./handlers/Events");
const Config_1 = require("./handlers/Config");
const getPath_1 = require("./utils/getPath");
const prefix_1 = require("./schemas/prefix");
const loadPrefixes_1 = require("./utils/loadPrefixes");
const sortCategories_1 = require("./utils/sortCategories");
const mongoConnect_1 = require("./utils/mongoConnect");
const help_1 = __importDefault(require("./commands/help"));
const setprefix_1 = __importDefault(require("./commands/setprefix"));
const consola_1 = __importDefault(require("consola"));
class Prodige extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.console = consola_1.default;
        this.colors = Colors_1.ProdigeColors;
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.cooldowns = new discord_js_1.Collection();
        this.globalCooldowns = new discord_js_1.Collection();
        this.categories = new discord_js_1.Collection();
        this.prefixes = {};
        this.clientOptions = options;
    }
    async start(configFile) {
        var _a, _b, _c, _d;
        this.config = configFile;
        this.dir = await getPath_1.getPath();
        //Adding default events
        this.on(message_1.messageEvent.name, message_1.messageEvent.run.bind(null, this));
        //Checking the config, commands and events
        const config = await Config_1.handleConfig(this).catch(err => {
            this.console.fatal(err);
            return err;
        });
        if (config === null || config === void 0 ? void 0 : config.success) {
            const commands = await Commands_1.handleCommands(this).catch(err => {
                this.console.fatal(err);
                return err;
            });
            if (commands === null || commands === void 0 ? void 0 : commands.success) {
                if (this.commands.size == 0) {
                    this.console.warn('0 command loaded');
                }
                else {
                    this.console.success(`${this.commands.size} command(s) successfully loaded`);
                }
                //Adding default commands if not disabled or overwritten
                if (((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.defaultCommands) === null || _b === void 0 ? void 0 : _b.setprefix) != false &&
                    !this.commands.get('setprefix') &&
                    this.config.prefixPerServer) {
                    this.commands.set(setprefix_1.default.name, setprefix_1.default);
                }
                if (((_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.defaultCommands) === null || _d === void 0 ? void 0 : _d.help) != false && !this.commands.get('help')) {
                    sortCategories_1.sortCategories(this);
                    this.commands.set(help_1.default.name, help_1.default);
                }
                const events = await Events_1.handleEvents(this).catch(err => {
                    this.console.fatal(err);
                    return err;
                });
                if (events === null || events === void 0 ? void 0 : events.success) {
                    if (this.events.size == 0) {
                        this.console.warn('0 event loaded');
                    }
                    else {
                        this.console.success(`${this.events.size} event(s) successfully loaded`);
                    }
                    this.login(this.config.token).then(() => {
                        var _a;
                        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.prefixPerServer) {
                            loadPrefixes_1.loadPrefixes(this).catch((err) => this.console.fatal(err));
                        }
                    });
                }
            }
        }
    }
    setPrefix(guildId, prefix) {
        return new Promise(resolve => {
            var _a;
            if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.mongodbURI)) {
                return resolve({ success: false, data: { error: 'No MongoDb URI' } });
            }
            if (!this.config.prefixPerServer) {
                return resolve({
                    success: false,
                    data: { error: '"prefixPerServer" must be set to true' },
                });
            }
            if (!guildId) {
                return resolve({
                    success: false,
                    data: { error: 'guildId can not be null' },
                });
            }
            mongoConnect_1.mongo(this.config.mongodbURI).then(async (mongoose) => {
                try {
                    await prefix_1.prefixSchema
                        .findOneAndUpdate({ _id: guildId }, { _id: guildId, prefix }, { upsert: true })
                        .then((data) => {
                        var _a;
                        this.prefixes[guildId] = [prefix];
                        //Mongoose returns null if the prefix is set for the first time
                        //So lets "manually" send the previous prefix wich is in the config
                        resolve({
                            success: true,
                            data: data !== null && data !== void 0 ? data : { _id: guildId, prefix: (_a = this.config) === null || _a === void 0 ? void 0 : _a.prefix },
                        });
                    })
                        .catch((error) => {
                        resolve({ success: false, data: { error } });
                    });
                }
                finally {
                    mongoose.connection.close();
                }
            });
        });
    }
    getGuildPrefix(guildId) {
        var _a, _b;
        return (_a = this.prefixes[guildId]) !== null && _a !== void 0 ? _a : (_b = this.config) === null || _b === void 0 ? void 0 : _b.prefix;
    }
}
exports.Prodige = Prodige;
