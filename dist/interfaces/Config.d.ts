export interface ProdigeConfig {
    token: string;
    prefix: string;
    commandsDir?: string;
    eventsDir?: string;
    ownerId?: Array<string>;
    prefixPerServer?: boolean;
    mongodbURI?: string;
}
