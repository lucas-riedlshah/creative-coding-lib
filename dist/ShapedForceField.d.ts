import { IForceField } from "./IForceField";
import { IShape } from "./IShape";
import { Particle } from "./Particle";
export declare class ShapedForceField implements IForceField {
    private _shape;
    private _callback;
    constructor(shape: IShape, callback: (shape: IShape, particle: Particle) => void);
    apply_force_field(particles: Particle[]): void;
}
export declare function apply_gravity(shape: IShape, particle: Particle): void;
