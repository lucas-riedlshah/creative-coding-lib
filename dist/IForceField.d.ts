import { Particle } from "./Particle";
export interface IForceField {
    apply_force_field(callback: (particle: Particle, ...args: any[]) => void, particles: Particle[]): void;
}
