import { IForceField } from "./IForceField";
import { Particle } from "./Particle";
export declare class ForceField implements IForceField {
    apply_force_field(callback: (particle: Particle) => void, particles: Particle[]): void;
}
