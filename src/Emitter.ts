import { IShape } from "./IShape";
import { IPositionable } from "./IPositionable";

export class Emitter {
  private _emitted_objects: IPositionable[] = []
  public shape: IShape

  public constructor(shape: IShape) {
    this.shape = shape
  }

  public get_emitted_objects() {
    return this._emitted_objects
  }

  public emit<T extends IPositionable>(callback: (x: number, y: number) => T, random: () => number, n = 100): T[] {
    const result: T[] = []

    for (let i = 0; i < n; i++) {
      const position = this.shape.get_random_point(random)
      const new_object = callback(position.x, position.y)
      result.push(new_object)
      this._emitted_objects.push(new_object)
    }

    return result
  }
}