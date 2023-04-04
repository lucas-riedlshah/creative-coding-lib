import { IForceField } from "./IForceField";
import { IShape } from "./IShape";
import { Particle } from "./Particle";
export declare class ShapedForceField implements IForceField {
    private _shape;
    constructor(shape: IShape);
    apply_force_field(callback: (particle: Particle, shape: IShape) => void, particles: Particle[]): void;
}
