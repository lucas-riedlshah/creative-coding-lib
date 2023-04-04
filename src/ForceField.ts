import { IForceField } from "./IForceField"
import { Particle } from "./Particle"

export class ForceField implements IForceField { // Currently just a glorified for-loop
  public apply_force_field(callback: (particle: Particle) => void, particles: Particle[]) {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      callback(particle)
    }
  }
}