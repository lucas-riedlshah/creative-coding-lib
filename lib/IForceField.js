import { Vector2 } from "./Vector2";
export function apply_gravity(particle, origin, mass = 100) {
    const force_vector = Vector2.subtract(origin, particle.position);
    const m = mass * particle.mass / force_vector.squared_magnitude;
    force_vector.normalize();
    force_vector.multiply_in_place(m);
    // particle.apply_force(force_vector)
    return force_vector;
}
