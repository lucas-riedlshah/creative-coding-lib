import p5 from "p5";
import { Vector2 } from "./Vector2";
import { ICurve } from "./ICurve";
export declare function generate_pencil_brush(p5: p5, options?: {
    brush_diameter?: number;
    density?: number;
    diameter_variability?: number;
    noise_scale?: number;
    bristle_diameter?: number;
    bristle_radial_distribution_func?: () => number;
}): (curve: ICurve, position: Vector2) => void;
export declare function generate_ink_brush(p5: p5, options?: {
    min_diameter?: number;
    max_diameter?: number;
    blotchiness?: number;
}): (curve: ICurve, position: Vector2) => void;
