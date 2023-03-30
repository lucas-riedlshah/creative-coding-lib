import { IShape } from "./IShape";
import { IPositionable } from "./IPositionable";
import { IEmitter } from "./IEmitter";
export declare class ShapedEmitter implements IEmitter {
    private _emitted_objects;
    private _shape;
    constructor(shape: IShape);
    get_emitted_objects(): IPositionable[];
    emit<T extends IPositionable>(callback: (x: number, y: number) => T, random: () => number, n?: number): T[];
}
