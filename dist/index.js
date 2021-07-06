"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prodige = void 0;
const discord_js_1 = require("discord.js");
const consola_1 = __importDefault(require("consola"));
const Colors_1 = require("./enums/Colors");
const message_1 = require("./events/message");
const Commands_1 = require("./loaders/Commands");
const Events_1 = require("./loaders/Events");
const Config_1 = require("./loaders/Config");
const getPath_1 = require("./utils/getPath");
class Prodige extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.console = consola_1.default;
        this.colors = Colors_1.ProdigeColors;
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.cooldowns = new discord_js_1.Collection();
    }
    async start(configFile) {
        this.config = configFile;
        this.dir = await getPath_1.getPath();
        this.on(message_1.event.name, message_1.event.run.bind(null, this));
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
                    this.login(this.config.token);
                }
            }
        }
    }
}
exports.Prodige = Prodige;
