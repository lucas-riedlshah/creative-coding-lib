import { IPositionable } from "./IPositionable";
export interface IEmitter {
    get_emitted_objects(): IPositionable[];
    emit<T extends IPositionable>(callback: (x: number, y: number) => T, random: () => number, n: number): T[];
}
