/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prodige } from '..';

export interface ProdigeEvent {
  name: string;
  run: (client: Prodige, ...args: any[]) => Promise<void>;
}
