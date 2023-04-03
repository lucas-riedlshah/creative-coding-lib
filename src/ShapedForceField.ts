import { IForceField } from "./IForceField"
import { IShape } from "./IShape"
import { Particle } from "./Particle"
import { Vector2 } from "./Vector2"

export class ShapedForceField implements IForceField {
  private _shape: IShape

  public constructor(shape: IShape) {
    this._shape = shape
  }

  public apply_force_field(callback: (particle: Particle, shape: IShape) => void, particles: Particle[]) {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      if (this._shape.contains(particle.position))
        callback(particle, this._shape)
    }
  }
}

export function apply_gravity(particle: Particle, shape: IShape) {
  const force_vector = Vector2.subtract(shape.position, particle.position)

  const m = 100 * particle.mass / force_vector.squared_magnitude

  force_vector.normalize()

  force_vector.multiply_in_place(m)

  particle.apply_force(force_vector)
}