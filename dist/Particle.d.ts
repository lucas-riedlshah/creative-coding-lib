import { IPositionable } from "./IPositionable";
import { Vector2 } from "./Vector2";
export declare class Particle implements IPositionable {
    private _position;
    private _velocity;
    private _acceleration;
    get position(): Vector2;
    get velocity(): Vector2;
    get acceleration(): Vector2;
    constructor(x: number, y: number);
    private update_position;
    update(): void;
    apply_force(x: number, y: number): void;
    move_to(x: number, y: number): void;
}
