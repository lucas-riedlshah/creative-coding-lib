import { IPositionable } from "./IPositionable";

export interface IEmitter {
  get_emitted_objects?(): IPositionable[] // Does this method actually provide utility?
  emit<T extends IPositionable>(callback: (x: number, y: number) => T, n: number, ...args: any[]): T[]
}