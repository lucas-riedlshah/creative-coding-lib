import { Vector2 } from './Vector2'
import { IPositionable } from './IPositionable'
import { IShape } from './IShape'

export class Triangle implements IShape, IPositionable {
  public a: Vector2
  public b: Vector2
  public c: Vector2

  public constructor(a: Vector2, b: Vector2, c: Vector2) {
    this.a = a
    this.b = b
    this.c = c
  }

  public get position(): Vector2 {
    const center_position = Vector2.add(this.a, this.b)
    center_position.add_in_place(this.c)
    center_position.divide_in_place(3)
    return center_position
  }

  get_random_point(random_func: () => number): Vector2 {
    const r1 = Math.sqrt(random_func())
    const r2 = random_func()

    return Vector2.add(
      Vector2.add(
        Vector2.multiply(this.a, 1 - r1),
        Vector2.multiply(this.b, r1 * (1 - r2))
      ),
      Vector2.multiply(this.c, r1 * r2)
    )
  }

  contains(point: Vector2): boolean {
    function sign(p1: Vector2, p2: Vector2, p3: Vector2) {
      return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)
    }
    const d1 = sign(point, this.a, this.b)
    const d2 = sign(point, this.b, this.c)
    const d3 = sign(point, this.c, this.a)
    const has_neg = d1 < 0 || d2 < 0 || d3 < 0
    const has_pos = d1 > 0 || d2 > 0 || d3 > 0
    return !(has_neg && has_pos)
  }
}
