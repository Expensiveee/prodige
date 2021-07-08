import { ProdigeArgument } from './Argument';
import { ProdigeMessageCommand } from './MessageCommand';
export interface ProdigeError {
    type: 'EXECUTION' | 'CHANNEL' | 'COOLDOWN' | 'PERMISSION' | 'ROLE' | 'ARGUMENT_REQUIRED' | 'ARGUMENT_WRONG_TYPE';
    data: ProdigeMessageCommand;
    argument?: ProdigeArgument;
    errorMessage?: string;
}
