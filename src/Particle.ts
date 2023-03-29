import { IPositionable } from "./IPositionable"
import { Vector2 } from "./Vector2"

export class Particle implements IPositionable {
  private _position: Vector2 = new Vector2(0, 0)
  private _velocity: Vector2 = new Vector2(0, 0)
  private _acceleration: Vector2 = new Vector2(0, 0)

  public get position(): Vector2 { return this._position }
  public get velocity(): Vector2 { return this._velocity }
  public get acceleration(): Vector2 { return this._acceleration }

  public constructor(x: number, y: number) {
    this._position = new Vector2(x, y)
  }

  private update_position() {
    this._velocity.add_vector_in_place(this._acceleration)

    this._position.add_vector_in_place(this._velocity)

    this._acceleration.x = 0
    this._acceleration.y = 0
  }

  public update() {
    this.update_position()
  }

  public apply_force(x: number, y: number) {
    this._acceleration.add_in_place(x, y)
  }

  public move_to(x: number, y: number): void {
    this._position
  }
}