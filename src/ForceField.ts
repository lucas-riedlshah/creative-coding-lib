import { Vector2 } from "."
import { IForceField } from "./IForceField"
import { Particle } from "./Particle"

export class ForceField implements IForceField {
  public apply_force_field(callback: (particle: Particle) => Vector2, particles: Particle[]) {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      particle.apply_force(callback(particle))
    }
  }
}