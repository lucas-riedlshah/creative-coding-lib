export class ForceField {
    apply_force_field(callback, particles) {
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            callback(particle);
        }
    }
}
