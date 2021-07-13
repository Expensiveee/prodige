import { Prodige } from '..';

export const sortCategories = (client: Prodige): void => {
  //Mapping through my commands Collection/Map
  client.commands.map(command => {
    //If the command doesn't have a specified category, description and ins't ownerOnly do the following:
    if (command.category && command.description && !command.ownerOnly) {
      //Getting my actual category wich matches the command category
      const category = client.categories.get(command.category);
      if (!category) {
        //If the category is null it means that it's the first time smth is being added to the key
        //Setting an array with the object
        client.categories.set(command.category, [
          {
            name: command.name,
            description: command.description,
            usage: command.usage,
            aliases: command.aliases,
          },
        ]);
      } else {
        //If the category alreasy exists, I'm just gonna push to the already existing array
        //And re-setting to the actual array that have been pushed
        category.push({
          name: command.name,
          description: command.description,
          usage: command.usage,
          aliases: command.aliases,
        });
        client.categories.set(command.category, category);
      }
    }
  });
};
