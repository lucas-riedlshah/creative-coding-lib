import { ICurve } from './ICurve';
import { Vector2 } from './Vector2';
export declare class Line implements ICurve {
    start: Vector2;
    end: Vector2;
    constructor(start: Vector2, end: Vector2);
    get length(): number;
    static intersection(a: Line, b: Line): Vector2 | null;
    get_segment(start: number, end: number): Line;
    draw(brush_callback: (curve: ICurve, position: Vector2) => void, resolution?: number): void;
    draw_segment(start: number, end: number, brush_callback: (curve: ICurve, position: Vector2) => void, resolution?: number): void;
}
