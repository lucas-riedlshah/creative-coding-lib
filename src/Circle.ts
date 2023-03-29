import { IShape } from "./IShape";
import { Vector2 } from "./Vector2";

export class Circle implements IShape{
  public x: number = 0
  public y: number = 0
  public inner_radius: number = 0
  public outer_radius: number = 100

  public constructor(x: number, y: number, radius: number)
  public constructor(x: number, y: number, inner_radius: number, outer_radius: number)
  public constructor(x: number, y: number, inner_radius: number, outer_radius: number = 0) {
    this.x = x
    this.y = y
    this.inner_radius = Math.min(inner_radius, outer_radius)
    this.outer_radius = Math.max(inner_radius, outer_radius)
  }

  public get_random_point(random: () => number): Vector2 {
    const theta = random() * Math.PI * 2;
    const r = Math.sqrt(random())
    const magnitude = this.inner_radius + (this.outer_radius - this.inner_radius) * r;
    const x = this.x + magnitude * Math.cos(theta)
    const y = this.y + magnitude * Math.sin(theta)

    return new Vector2(x, y)
  }
}