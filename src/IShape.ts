import { IPositionable } from "./IPositionable";
import { Vector2 } from "./Vector2";

export interface IShape extends IPositionable {
  get_random_point(random_func: () => number): Vector2
  contains(point: Vector2): boolean
}