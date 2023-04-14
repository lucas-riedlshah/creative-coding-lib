import { Vector2 } from './Vector2'

export class Line {
  public start: Vector2
  public end: Vector2

  public constructor(start: Vector2, end: Vector2) {
    this.start = start
    this.end = end
  }

  public get length() {
    return Vector2.subtract(this.end, this.start).magnitude
  }

  public get_segment(start: number, end: number): Line {
    const segment_start = Vector2.lerp(this.start, this.end, start)
    const segment_end = Vector2.lerp(this.start, this.end, end)
    return new Line(segment_start, segment_end)
  }

  public draw(brush_callback: (position: Vector2, distance_from_start: number) => void, resolution = 1) {
    const N = this.length * resolution
    const step: Vector2 = Vector2.divide(Vector2.subtract(this.end, this.start), N)
    const position = this.start.clone()
    for (let i = 0; i < N; i++) {
      position.add_in_place(step)
      const distance = Vector2.subtract(position, this.start).magnitude
      brush_callback(position, distance)
    }
  }

  public draw_segment(start: number, end: number, brush_callback: (position: Vector2, distance_from_start: number) => void, resolution = 1) {
    const segment = this.get_segment(start, end - Number.EPSILON * 100)
    // segment.draw(brush_callback, resolution)
    const N = segment.length * resolution
    const step: Vector2 = Vector2.divide(Vector2.subtract(segment.end, segment.start), N)
    const position = segment.start.clone()
    for (let i = 0; i < N; i++) {
      position.add_in_place(step)
      const distance = Vector2.subtract(position, this.start).magnitude
      brush_callback(position, distance)
    }
  }
}
