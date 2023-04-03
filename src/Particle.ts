import { IEmitter } from "./IEmitter"
import { IPositionable } from "./IPositionable"
import { Vector2 } from "./Vector2"

export class Particle implements IPositionable, IEmitter {
  public age = 0
  public dead = false
  public mass: number
  public lifetime: number

  private _position: Vector2 = new Vector2(0, 0)
  private _velocity: Vector2 = new Vector2(0, 0)
  private _acceleration: Vector2 = new Vector2(0, 0)

  public constructor(x: number, y: number, mass = 1, lifetime = Infinity) {
    this._position = new Vector2(x, y)
    this.mass = mass
    this.lifetime = lifetime
  }

  public get position(): Vector2 { return this._position }
  public get velocity(): Vector2 { return this._velocity }
  public get acceleration(): Vector2 { return this._acceleration }

  public update() {
    if (this.dead) return

    this.age++
    if (this.age > this.lifetime) this.dead = true

    this._update_position()
  }

  public apply_force(force: Vector2) {
    this._acceleration.add_in_place(Vector2.divide(force, this.mass))
  }
  
  public emit<T extends IPositionable>(callback: (x: number, y: number) => T, n: number): T[] {
    const result: T[] = []
    for (let i = 0; i < n; i++)
      result.push(callback(this.position.x, this.position.y))
    return result
  }

  private _update_position() {
    this._velocity.add_in_place(this._acceleration)
    this._position.add_in_place(this._velocity)
    this._acceleration.set(0, 0)
  }
}