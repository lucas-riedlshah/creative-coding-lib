import { IPositionable } from "./IPositionable";
import { IShape } from "./IShape";
import { Vector2 } from "./Vector2";

export class Circle implements IShape, IPositionable {
  public position: Vector2
  public inner_radius: number
  public outer_radius: number

  public constructor(x: number, y: number, radius: number)
  public constructor(x: number, y: number, inner_radius: number, outer_radius: number)
  public constructor(x: number, y: number, inner_radius: number, outer_radius = 0) {
    this.position = new Vector2(x, y)
    this.inner_radius = Math.abs(Math.min(inner_radius, outer_radius))
    this.outer_radius = Math.abs(Math.max(inner_radius, outer_radius))
  }

  public get_random_point(random: () => number): Vector2 {
    const theta = random() * Math.PI * 2;
    const r = Math.sqrt(random())
    const magnitude = this.inner_radius + (this.outer_radius - this.inner_radius) * r;
    const x = this.position.x + magnitude * Math.cos(theta)
    const y = this.position.y + magnitude * Math.sin(theta)

    return new Vector2(x, y)
  }

  public contains(point: Vector2): boolean {
    const d = Vector2.distance(this.position, point)
    return d > this.inner_radius && d < this.outer_radius
  }
}