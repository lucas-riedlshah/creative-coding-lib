export class ShapedForceField {
    constructor(shape, callback) {
        this._shape = shape;
        this._callback = callback;
    }
    apply_force_field(particles) {
        for (let i = 0; i < particles.length; i++)
            this._callback(this._shape, particles[i]);
    }
}
export function apply_gravity(shape, particle) {
    const force_vector = shape.position.subtract_vector(particle.position);
    const m = 100 * particle.mass / force_vector.squared_magnitude;
    force_vector.normalize();
    force_vector.multiply_in_place(m);
    particle.apply_force(force_vector);
}
