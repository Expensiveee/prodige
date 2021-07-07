import { ProdigeArgumentType } from '../enums/ArgumentType';
import { ProdigeChannelType } from '../enums/ChannelsType';

export interface ProdigeArgument {
  name: string;
  type: keyof typeof ProdigeArgumentType | keyof typeof ProdigeChannelType;
  required?: boolean;
  byDefault?: string;
}
