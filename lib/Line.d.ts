import { Vector2 } from './Vector2';
export declare class Line {
    start: Vector2;
    end: Vector2;
    constructor(start: Vector2, end: Vector2);
    get length(): number;
    static intersection(a: Line, b: Line): Vector2 | null;
    get_segment(start: number, end: number): Line;
    draw(brush_callback: (line: Line, position: Vector2, distance_from_start: number) => void, resolution?: number): void;
    draw_segment(start: number, end: number, brush_callback: (line: Line, position: Vector2, distance_from_start: number) => void, resolution?: number): void;
}
