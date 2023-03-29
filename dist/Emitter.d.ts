import { IShape } from "./IShape";
import { IPositionable } from "./IPositionable";
export declare class Emitter {
    private _emitted_objects;
    shape: IShape;
    constructor(shape: IShape);
    get_emitted_objects(): IPositionable[];
    emit<T extends IPositionable>(callback: (x: number, y: number) => T, random: () => number, n?: number): T[];
}
