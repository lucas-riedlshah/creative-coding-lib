export class ShapedForceField {
    constructor(shape) {
        this._shape = shape;
    }
    apply_force_field(callback, particles) {
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            if (this._shape.contains(particle.position))
                callback(particle, this._shape);
        }
    }
}
export function apply_gravity(particle, shape) {
    const force_vector = shape.position.subtract_vector(particle.position);
    const m = 100 * particle.mass / force_vector.squared_magnitude;
    force_vector.normalize();
    force_vector.multiply_in_place(m);
    particle.apply_force(force_vector);
}
