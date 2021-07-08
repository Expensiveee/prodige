"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prodige = void 0;
const discord_js_1 = require("discord.js");
const Colors_1 = require("./enums/Colors");
const message_1 = require("./events/message");
const Commands_1 = require("./loaders/Commands");
const Events_1 = require("./loaders/Events");
const Config_1 = require("./loaders/Config");
const getPath_1 = require("./utils/getPath");
const prefix_1 = require("./schemas/prefix");
const loadPrefixes_1 = require("./utils/loadPrefixes");
const mongoConnect_1 = require("./utils/mongoConnect");
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
        this.guildPrefixes = {};
    }
    async start(configFile) {
        this.config = configFile;
        this.dir = await getPath_1.getPath();
        //Adding the default on message event for command handling
        this.on(message_1.event.name, message_1.event.run.bind(null, this));
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
                const events = await Events_1.handleEvents(this).catch(err => {
                    this.console.fatal(err);
                    return err;
                });
                if (events === null || events === void 0 ? void 0 : events.success) {
                    this.login(this.config.token).then(() => {
                        if (this.config.prefixPerServer) {
                            loadPrefixes_1.loadPrefixes(this).catch((err) => this.console.fatal(err));
                        }
                    });
                }
            }
        }
    }
    setPrefix(guildId, prefix) {
        return new Promise((resolve, reject) => {
            mongoConnect_1.mongo(this.config.mongodbURI).then(async (mongoose) => {
                try {
                    await prefix_1.prefixSchema
                        .findOneAndUpdate({ _id: guildId }, { _id: guildId, prefix }, { upsert: true })
                        .then((data) => {
                        this.guildPrefixes[guildId] = prefix;
                        //Mongoose returns null if the prefix is set for the first time
                        //So lets "manually" send the previous prefix wich is in the config if data is
                        resolve({
                            success: true,
                            data: data !== null && data !== void 0 ? data : { _id: guildId, prefix: this.config.prefix },
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
        var _a;
        return (_a = this.guildPrefixes[guildId]) !== null && _a !== void 0 ? _a : this.config.prefix;
    }
}
exports.Prodige = Prodige;
