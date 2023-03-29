import { Vector2 } from "./Vector2";

export interface IShape {
  get_random_point(random_func: () => number): Vector2
}