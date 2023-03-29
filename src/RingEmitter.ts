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

  public emit<T extends IPositionable>(callback: (x: number, y: number) => T, n = 100): T[] {
    const result: T[] = []

    for (let i = 0; i < n; i++) {
      const angle = Math.random() * Math.PI * 2;
      
      const x = this._x + this._radius * Math.cos(angle)
      const y = this._y + this._radius * Math.sin(angle)

      const new_object = callback(x, y)

      result.push(new_object)
      this._emitted_objects.push(new_object)
    }

    return result
  }
}