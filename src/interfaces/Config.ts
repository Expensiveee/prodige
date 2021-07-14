export interface ProdigeConfig {
  token: string;
  prefix: Array<string>;
  commandsDir?: string;
  eventsDir?: string;
  ownerId?: Array<string>;
  prefixPerServer?: boolean;
  mongodbURI?: string;
  allowBots?: boolean;
  defaultCommands?: {
    help?: boolean;
  };
}
