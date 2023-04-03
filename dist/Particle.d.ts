import { IEmitter } from "./IEmitter";
import { IPositionable } from "./IPositionable";
import { Vector2 } from "./Vector2";
export declare class Particle implements IPositionable, IEmitter {
    age: number;
    dead: boolean;
    mass: number;
    lifetime: number;
    private _position;
    private _velocity;
    private _acceleration;
    constructor(x: number, y: number, mass?: number, lifetime?: number);
    get position(): Vector2;
    get velocity(): Vector2;
    get acceleration(): Vector2;
    update(): void;
    apply_force(force: Vector2): void;
    emit<T extends IPositionable>(callback: (x: number, y: number) => T, n: number): T[];
    private _update_position;
}
