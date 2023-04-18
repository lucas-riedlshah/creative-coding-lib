import { ICurve } from './ICurve'
import { Vector2 } from './Vector2'

export class Line implements ICurve {
  public start: Vector2
  public end: Vector2

  public constructor(start: Vector2, end: Vector2) {
    this.start = start
    this.end = end
  }

  public get length() {
    return Vector2.subtract(this.end, this.start).magnitude
  }

  public static intersection(a: Line, b: Line): Vector2 | null {
    const p: Vector2 = a.start
    const q: Vector2 = b.start
    const r: Vector2 = Vector2.subtract(a.end, a.start)
    const s: Vector2 = Vector2.subtract(b.end, b.start)

    const r_cross_s: number = Vector2.cross(r, s)
    const q_sub_p_cross_r: number = Vector2.cross(Vector2.subtract(q, p), r)

    if (r_cross_s === 0) {
      if (q_sub_p_cross_r === 0) {
        // The lines are collinear - we still return null here and pretend they don't intersect :)
        return null
      } else {
        // No intersection, however the lines are parallel.
        return null
      }
    } else {
      const q_sub_p_cross_s: number = Vector2.cross(Vector2.subtract(q, p), s)

      const u = q_sub_p_cross_r / r_cross_s
      const t = q_sub_p_cross_s / r_cross_s

      if (0 <= u && u <= 1 && 0 <= t && t <= 1) {
        // The lines do intersect.
        return Vector2.add(p, Vector2.multiply(r, t))
      }
    }

    return null
  }

  public get_segment(start: number, end: number): Line {
    const segment_start = Vector2.lerp(this.start, this.end, Math.max(0, Math.min(1, start)))
    const segment_end = Vector2.lerp(this.start, this.end, Math.max(0, Math.min(1, end)))
    return new Line(segment_start, segment_end)
  }

  public draw(brush_callback: (curve: ICurve, position: Vector2) => void, resolution = 1) {
    const N = this.length * resolution
    const step: Vector2 = Vector2.divide(Vector2.subtract(this.end, this.start), N)
    const position = this.start.clone()
    for (let i = 0; i < N; i++) {
      position.add_in_place(step)
      brush_callback(this, position)
    }
  }

  public draw_segment(start: number, end: number, brush_callback: (curve: ICurve, position: Vector2) => void, resolution = 1) {
    const segment = this.get_segment(start, end - Number.EPSILON * 100)
    // segment.draw(brush_callback, resolution)
    const N = segment.length * resolution
    const step: Vector2 = Vector2.divide(Vector2.subtract(segment.end, segment.start), N)
    const position = segment.start.clone()
    for (let i = 0; i < N; i++) {
      position.add_in_place(step)
      brush_callback(this, position)
    }
  }
}
