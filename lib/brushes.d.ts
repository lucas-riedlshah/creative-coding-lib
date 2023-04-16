import p5 from "p5";
import { Vector2 } from "./Vector2";
import { Line } from ".";
export declare function generate_pencil_brush(p5: p5, brush_diameter?: number, density?: number, diameter_variability?: number, noise_scale?: number, bristle_diameter?: number): (line: Line, position: Vector2, distance_from_start: number) => void;
export declare function generate_ink_brush(p5: p5, blotchiness?: number, min_diameter?: number, max_diameter?: number): (_line: Line, position: Vector2, distance_from_start: number) => void;
