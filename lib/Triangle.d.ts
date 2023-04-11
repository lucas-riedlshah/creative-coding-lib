import { Vector2 } from './Vector2';
import { IPositionable } from './IPositionable';
import { IShape } from './IShape';
export declare class Triangle implements IShape, IPositionable {
    a: Vector2;
    b: Vector2;
    c: Vector2;
    constructor(a: Vector2, b: Vector2, c: Vector2);
    get position(): Vector2;
    get_random_point(random_func: () => number): Vector2;
    contains(point: Vector2): boolean;
}
