import { IForceField } from "./IForceField"
import { IShape } from "./IShape"
import { Particle } from "./Particle"

export class ShapedForceField implements IForceField {
  private _shape: IShape
  private _callback: (shape: IShape, particle: Particle) => void

  public constructor(shape: IShape, callback: (shape: IShape, particle: Particle) => void) {
    this._shape = shape
    this._callback = callback
  }

  public apply_force_field(particles: Particle[]) {
    for (let i = 0; i < particles.length; i++) this._callback(this._shape, particles[i])
  }
}

export function apply_gravity(shape: IShape, particle: Particle) {
  const force_vector = shape.position.subtract_vector(particle.position)

  const m = 100 * particle.mass / force_vector.squared_magnitude

  force_vector.normalize()

  force_vector.multiply_in_place(m)

  particle.apply_force(force_vector)
}