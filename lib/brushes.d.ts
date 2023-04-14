import p5 from "p5";
import { Vector2 } from "./Vector2";
export declare function generate_pencil_brush(p5: p5, diameter?: number, density?: number, diameter_variability?: number, bristle_diameter?: number): (position: Vector2, distance_from_start: number) => void;
export declare function generate_ink_brush(p5: p5, blotchiness?: number, min_diameter?: number, max_diameter?: number): (position: Vector2, distance_from_start: number) => void;
