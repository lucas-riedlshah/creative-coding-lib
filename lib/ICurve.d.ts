import { Vector2 } from ".";
export interface ICurve {
    get length(): number;
    get start(): Vector2;
    get end(): Vector2;
    draw(brush_callback: (curve: ICurve, position: Vector2) => void, resolution?: number): void;
    draw_segment(start: number, end: number, brush_callback: (curve: ICurve, position: Vector2) => void, resolution?: number): void;
}
