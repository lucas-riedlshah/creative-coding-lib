import { Vector2 } from "."
import { IForceField } from "./IForceField"
import { IShape } from "./IShape"
import { Particle } from "./Particle"

export class ShapedForceField implements IForceField {
  private _shape: IShape

  public constructor(shape: IShape) {
    this._shape = shape
  }

  public apply_force_field(callback: (particle: Particle, shape: IShape) => Vector2, particles: Particle[]) {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      if (this._shape.contains(particle.position)) {
        particle.apply_force(callback(particle, this._shape))
      }
    }
  }
}