import { Particle } from "./Particle";
import { Vector2 } from "./Vector2";

export interface IForceField {
  apply_force_field(callback: (particle: Particle, ...args: any[]) => Vector2, particles: Particle[]): void
}

export function apply_gravity(particle: Particle, origin: Vector2, mass = 100): Vector2 {
  const force_vector = Vector2.subtract(origin, particle.position)

  const m = mass * particle.mass / force_vector.squared_magnitude

  force_vector.normalize()

  force_vector.multiply_in_place(m)

  // particle.apply_force(force_vector)

  return force_vector
}