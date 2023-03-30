import { IShape } from "./IShape";
import { IPositionable } from "./IPositionable";
import { IEmitter } from "./IEmitter";

export class ShapedEmitter implements IEmitter {
  private _emitted_objects: IPositionable[] = []
  private _shape: IShape

  public constructor(shape: IShape) {
    this._shape = shape
  }

  public get_emitted_objects() {
    return this._emitted_objects
  }

  public emit<T extends IPositionable>(callback: (x: number, y: number) => T, random: () => number, n = 100): T[] {
    const result: T[] = []

    for (let i = 0; i < n; i++) {
      const position = this._shape.get_random_point(random)
      const new_object = callback(position.x, position.y)
      result.push(new_object)
      this._emitted_objects.push(new_object)
    }

    return result
  }
}