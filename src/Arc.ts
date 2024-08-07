import { ICurve } from './ICurve'
import { Vector2 } from './Vector2'

export class Arc implements ICurve {
  public pivot: Vector2
  public radius: number
  public start_angle: number
  public end_angle: number

  public constructor(pivot: Vector2, radius: number, start_angle: number, end_angle: number) {
    this.pivot = pivot
    this.radius = radius
    this.start_angle = start_angle
    this.end_angle = end_angle
  }

  public get length() {
    return this.radius * Math.abs(this.end_angle - this.start_angle)
  }

  public get start() {
    return new Vector2(
      this.pivot.x + this.radius * Math.sin(this.start_angle),
      this.pivot.y + this.radius * -Math.cos(this.start_angle),
    )
  }

  public get end() {
    return new Vector2(
      this.pivot.x + this.radius * Math.sin(this.end_angle),
      this.pivot.y + this.radius * -Math.cos(this.end_angle),
    )
  }

  /**
   * 
   * @param start The starting point of the arc.
   * @param end The end point of the arc.
   * @param pivot_radius The radius of the pivot from both the start and end points.
   * @returns The Arc between the points `start` and `end`.
   */
  public static between(start: Vector2, end: Vector2, pivot_radius = 0): Arc {
    const half_distance = Vector2.distance(start, end) / 2
    const radius_sign = pivot_radius >= 0 ? 1 : -1
    // pivot_radius must be >= half_distance
    pivot_radius = Math.max(Math.abs(pivot_radius), half_distance)

    const m = Math.sqrt(pivot_radius * pivot_radius - half_distance * half_distance)
    const perpendicular_distance = Vector2.subtract(end, start).normalized
    perpendicular_distance.rotate(Math.PI / 2)
    perpendicular_distance.multiply_in_place(m)

    const pivot = Vector2.add(start, end)
    pivot.divide_in_place(2)
    pivot.add_in_place(perpendicular_distance)

    const a = -Vector2.angle(Vector2.up, Vector2.subtract(start, pivot)) 
    const b = -Vector2.angle(Vector2.up, Vector2.subtract(end, pivot))

    let start_angle = Math.min(a, b)
    let end_angle = Math.max(a, b)

    if (radius_sign > 0) {
      if (end_angle - start_angle >= Math.PI)
        end_angle -= Math.PI * 2
    } else {
      if (end_angle - start_angle < Math.PI)
        start_angle += Math.PI * 2
    }

    console.log(start_angle, end_angle)
    console.log(pivot)

    return new Arc(pivot, pivot_radius, start_angle, end_angle)
  }

  public get_segment(start: number, end: number): Arc {
    start = Math.max(0, Math.min(1, start))
    end = Math.max(0, Math.min(1, end))
    const segment_start = this._lerp_angle(this.start_angle, this.end_angle, start)
    const segment_end = this._lerp_angle(this.start_angle, this.end_angle, end)
    return new Arc(this.pivot, this.radius, segment_start, segment_end)
  }

  public draw(
    brush_callback: (curve: ICurve, position: Vector2) => void,
    resolution = 1
  ) {
    const N = this.length * resolution
    for (let i = 0; i < N; i++) {
      const angle = this._lerp_angle(this.start_angle, this.end_angle, i / N)
      const position = new Vector2(
        this.pivot.x + this.radius * Math.sin(angle),
        this.pivot.y + this.radius * -Math.cos(angle),
      )
      brush_callback(this, position)
    }
  }

  public draw_segment(
    start: number,
    end: number,
    brush_callback: (curve: ICurve, position: Vector2) => void,
    resolution = 1
  ) {
    const segment = this.get_segment(start, end - Number.EPSILON * 100)
    // segment.draw(brush_callback, resolution)
    const N = segment.length * resolution
    for (let i = 0; i < N; i++) {
      const angle = this._lerp_angle(segment.start_angle, segment.end_angle, i / N)
      const position = new Vector2(
        segment.pivot.x + segment.radius * Math.sin(angle),
        segment.pivot.y + segment.radius * -Math.cos(angle),
      )
      brush_callback(this, position)
    }
  }

  private _lerp_angle(a: number, b: number, value: number) {
    return a + value * (b - a)
  }
}
