import { IEmitter } from "./IEmitter"
import { IPositionable } from "./IPositionable"
import { Vector2 } from "./Vector2"

export class Particle implements IPositionable, IEmitter {
  private _position: Vector2 = new Vector2(0, 0)
  private _velocity: Vector2 = new Vector2(0, 0)
  private _acceleration: Vector2 = new Vector2(0, 0)

  public age: number = 0
  public dead: boolean = false
  public mass: number
  public lifetime: number

  public get position(): Vector2 { return this._position }
  public get velocity(): Vector2 { return this._velocity }
  public get acceleration(): Vector2 { return this._acceleration }

  public constructor(x: number, y: number, mass: number = 1, lifetime: number = Infinity) {
    this._position = new Vector2(x, y)
    this.mass = mass
    this.lifetime = lifetime
  }

  private update_position() {
    this._velocity.add_vector_in_place(this._acceleration)

    this._position.add_vector_in_place(this._velocity)

    this._acceleration.x = 0
    this._acceleration.y = 0
  }

  public update() {
    if (this.dead) return

    this.age++
    if (this.age > this.lifetime) this.dead = true

    this.update_position()
  }

  public apply_force(force: Vector2) {
    this._acceleration.add_in_place(force.x / this.mass, force.y / this.mass)
  }
  
  public emit<T extends IPositionable>(callback: (x: number, y: number) => T, n: number): T[] {
    const result: T[] = []
    for (let i = 0; i < n; i++)
      result.push(callback(this.position.x, this.position.y))
    return result
  }
}