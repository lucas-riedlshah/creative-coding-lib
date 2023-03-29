import { IPositionable } from "./IPositionable";
export declare class RingEmitter {
    private _emitted_objects;
    private _radius;
    private _x;
    private _y;
    constructor(x?: number, y?: number, radius?: number);
    get_emitted_objects(): IPositionable[];
    emit<T extends IPositionable>(type: {
        new (): T;
    }, n?: number): T[];
}
