import { ICurve } from './ICurve';
import { Vector2 } from './Vector2';
export declare class Arc implements ICurve {
    pivot: Vector2;
    radius: number;
    start_angle: number;
    end_angle: number;
    constructor(pivot: Vector2, radius: number, start_angle: number, end_angle: number);
    get length(): number;
    get start(): Vector2;
    get end(): Vector2;
    /**
     *
     * @param start The starting point of the arc.
     * @param end The end point of the arc.
     * @param pivot_radius The radius of the pivot from both the start and end points.
     * @returns The Arc between the points `start` and `end`.
     */
    static between(start: Vector2, end: Vector2, pivot_radius?: number): Arc;
    get_segment(start: number, end: number): Arc;
    draw(brush_callback: (curve: ICurve, position: Vector2) => void, resolution?: number): void;
    draw_segment(start: number, end: number, brush_callback: (curve: ICurve, position: Vector2) => void, resolution?: number): void;
    private _lerp_angle;
}
