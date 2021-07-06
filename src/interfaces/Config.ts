export interface ProdigeConfig {
  token: string;
  prefix: string;
  commandsDir?: string;
  eventsDir?: string;
  ownerId?: number;
  delErrorMessage?: number;
  sendErrorMessages?: boolean;
}
