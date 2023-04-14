import { Vector2 } from './Vector2';
export declare class Line {
    start: Vector2;
    end: Vector2;
    constructor(start: Vector2, end: Vector2);
    get length(): number;
    get_segment(start: number, end: number): Line;
    draw(brush_callback: (position: Vector2, distance_from_start: number) => void, resolution?: number): void;
    draw_segment(start: number, end: number, brush_callback: (position: Vector2, distance_from_start: number) => void, resolution?: number): void;
}
