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
exports.handleEvents = void 0;
const fs = __importStar(require("fs"));
const handleEvents = (client) => {
    return new Promise((resolve, reject) => {
        //Using the default events path or the events dir in the config
        const eventsDir = client.config.eventsDir
            ? `${client.dir}/${client.config.eventsDir}`
            : `${client.dir}/events`;
        if (!fs.existsSync(eventsDir))
            fs.mkdirSync(eventsDir);
        const eventsFiles = fs
            .readdirSync(eventsDir)
            .filter(file => file.endsWith('.ts') || file.endsWith('.js'));
        try {
            for (let i = 0; i < eventsFiles.length; i++) {
                const file = eventsFiles[i];
                const event = require(`${eventsDir}/${file}`);
                if (!event.name || typeof event.name != 'string') {
                    return reject({
                        success: false,
                        message: `You forgot to specify an event name in: ${file}`,
                    });
                }
                if (!(event === null || event === void 0 ? void 0 : event.run)) {
                    return reject({
                        success: false,
                        message: `You forgot to specify a run function in: ${file}`,
                    });
                }
                client.events.set(event.name, event);
                client.on(event.name, event.run.bind(null, client));
            }
            resolve({ success: true });
        }
        catch (err) {
            return reject({ success: false, message: err });
        }
    });
};
exports.handleEvents = handleEvents;
