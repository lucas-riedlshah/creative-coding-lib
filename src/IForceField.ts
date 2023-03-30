import { Particle } from "./Particle";

export interface IForceField {
  apply_force_field(particles: Particle[]): void
}