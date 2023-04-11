import { Particle } from "./Particle";
import { Vector2 } from "./Vector2";
export interface IForceField {
    apply_force_field(callback: (particle: Particle, ...args: any[]) => Vector2, particles: Particle[]): void;
}
export declare function apply_gravity(particle: Particle, origin: Vector2, mass?: number): Vector2;
