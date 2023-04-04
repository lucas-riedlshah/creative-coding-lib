import { IForceField } from "./IForceField"
import { IShape } from "./IShape"
import { Particle } from "./Particle"

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