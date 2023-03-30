import { IPositionable } from "./IPositionable";
import { IShape } from "./IShape";
import { Vector2 } from "./Vector2";
export declare class Circle implements IShape, IPositionable {
    position: Vector2;
    inner_radius: number;
    outer_radius: number;
    constructor(x: number, y: number, radius: number);
    constructor(x: number, y: number, inner_radius: number, outer_radius: number);
    get_random_point(random: () => number): Vector2;
    contains(point: Vector2): boolean;
}
