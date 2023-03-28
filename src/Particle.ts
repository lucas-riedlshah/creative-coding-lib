import { IPositionable } from "./IPositionable"

export class Particle implements IPositionable {
  private _position: [number, number] = [0, 0]
  private _velocity: [number, number] = [0, 0]
  private _acceleration: [number, number] = [0, 0]

  public constructor(x: number, y: number) {
    this._position = [x, y]
  }

  public get x(): number {
    return this._position[0]
  }

  public get y(): number {
    return this._position[1]
  }

  public get position(): [number, number] {
    return this._position
  }

  public get velocity(): [number, number] {
    return this._velocity
  }

  public get acceleration(): [number, number] {
    return this._acceleration
  }

  private update_position() {
    this._velocity[0] += this._acceleration[0]
    this._velocity[1] += this._acceleration[1]

    this._position[0] += this._velocity[0]
    this._position[1] += this._velocity[1]

    this._acceleration[0] = 0
    this._acceleration[1] = 0
  }

  public update() {
    this.update_position()
  }

  public apply_force(x: number, y: number) {
    this._acceleration[0] += x
    this._acceleration[1] += y
  }

  public set_position(x: number, y: number): void {
    this._position[0] = x
    this._position[1] = y
  }
}