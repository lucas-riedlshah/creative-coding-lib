import { IPositionable } from './IPositionable';
import { IShape } from './IShape';
import { Vector2 } from './Vector2';
export declare class Square implements IShape, IPositionable {
    position: Vector2;
    width: number;
    height: number;
    constructor(position_x: number, position_y: number, radius: number);
    constructor(position_x: number, position_y: number, width: number, height: number);
    get_random_point(random: () => number): Vector2;
    contains(point: Vector2): boolean;
}
