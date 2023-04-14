import { Vector2 } from './Vector2';
import { IShape } from './IShape';
import { Triangle } from './Triangle';
export declare class Polygon implements IShape {
    vertices: Vector2[];
    constructor(vertices: Vector2[]);
    get position(): Vector2;
    set position(new_position: Vector2);
    get_triangulation(): Triangle[];
    get_area(): number;
    get_random_point(random_func: () => number): Vector2;
    contains(point: Vector2): boolean;
}
