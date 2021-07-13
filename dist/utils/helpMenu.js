"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpMenu = void 0;
const helpMenu = (client, prefix) => {
    if (client.categories.size > 0) {
        //Mapping through categories and getting that big array of command objects
        return (client.categories
            .map((commandCategories, category) => {
            //Mapping again IN the array and returning the commandCategory.name of each object
            //Then joining them
            const commands = commandCategories
                .map(commandCategory => {
                return `\`\`${commandCategory.name}\`\``;
            })
                .join(', ');
            //Returning the category name with all the commands
            //And joining them by skipping 2 lines
            return `**${category}** (${commandCategories.length})\n ${commands}`;
        })
            .join('\n\n') + `\n\nUse ${prefix}help <command name> for info`);
    }
    return 'No commands to show';
};
exports.helpMenu = helpMenu;
