import p5 from "p5";
import { Vector2 } from "./Vector2";
import { Line } from ".";
export declare function generate_pencil_brush(p5: p5, options?: {
    brush_diameter?: number;
    density?: number;
    diameter_variability?: number;
    noise_scale?: number;
    bristle_diameter?: number;
    bristle_distribution?: {
        use_gaussian: boolean;
        gaussian_mean: number;
        gaussian_sd: number;
    };
}): (line: Line, position: Vector2) => void;
export declare function generate_ink_brush(p5: p5, options?: {
    min_diameter?: number;
    max_diameter?: number;
    blotchiness?: number;
}): (line: Line, position: Vector2) => void;
