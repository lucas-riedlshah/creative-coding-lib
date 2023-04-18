import { Vector2 } from ".";

export interface ICurve { // TODO: Is this really the right name for this interface?
  get length(): number
  get start(): Vector2
  get end(): Vector2
  draw(brush_callback: (curve: ICurve, position: Vector2) => void, resolution?: number): void
  draw_segment(start: number, end: number, brush_callback: (curve: ICurve, position: Vector2) => void, resolution?: number): void
}