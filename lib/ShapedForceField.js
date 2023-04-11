export class ShapedForceField {
    _shape;
    constructor(shape) {
        this._shape = shape;
    }
    apply_force_field(callback, particles) {
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            if (this._shape.contains(particle.position)) {
                particle.apply_force(callback(particle, this._shape));
            }
        }
    }
}
