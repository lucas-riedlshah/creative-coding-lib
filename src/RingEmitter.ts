import { IPositionable } from "./IPositionable"

export class RingEmitter {
  private _emitted_objects: IPositionable[] = []
  private _radius: number
  private _x: number
  private _y: number

  public constructor(x = 0, y = 0, radius = 10) {
    this._x = x
    this._y = y
    this._radius = radius
  }

  public get_emitted_objects() {
    return this._emitted_objects
  }

  public emit<T extends IPositionable>(type: { new(): T }, n = 100): T[] {
    const result: T[] = []

    for (let i = 0; i < n; i++) {
      const new_object = new type();
      const angle = Math.random() * Math.PI * 2;
      new_object.set_position(this._x + this._radius * Math.cos(angle), this._y + this._radius * Math.sin(angle))

      result.push(new_object)
      this._emitted_objects.push(new_object)
    }

    return result
  }
}