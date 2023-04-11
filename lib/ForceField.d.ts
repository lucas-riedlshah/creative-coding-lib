import { Vector2 } from ".";
import { IForceField } from "./IForceField";
import { Particle } from "./Particle";
export declare class ForceField implements IForceField {
    apply_force_field(callback: (particle: Particle) => Vector2, particles: Particle[]): void;
}
