import { Vector2 } from "./Vector2";
export function generate_pencil_brush(p5, options) {
    const brush_diameter = options?.brush_diameter || 2;
    const density = options?.density || 3;
    const diameter_variability = options?.diameter_variability ? Math.max(0, Math.min(1, options.diameter_variability)) : 1;
    const bristle_diameter = options?.bristle_diameter || 1;
    const noise_scale = options?.noise_scale || 0.05;
    return (line, position) => {
        const distance_from_start = Vector2.distance(line.start, position);
        const diameter = brush_diameter -
            brush_diameter * diameter_variability * p5.noise(line.start.x, line.start.y, distance_from_start * noise_scale);
        const N = density * diameter;
        for (let i = 0; i < (N < 1 ? +(p5.random() < N) : N); i++) {
            const offsetted_position = Vector2.forward;
            offsetted_position.rotate(p5.random() * Math.PI * 2);
            offsetted_position.multiply_in_place(Math.sqrt(p5.random()) * diameter * 0.5);
            offsetted_position.add_in_place(position);
            p5.circle(offsetted_position.x, offsetted_position.y, bristle_diameter);
        }
    };
}
export function generate_ink_brush(p5, options) {
    const temp_min = options?.min_diameter || 0.5;
    const temp_max = options?.max_diameter || 5;
    const min_diameter = Math.min(temp_min, temp_max);
    const max_diameter = Math.max(temp_min, temp_max);
    const blotchiness = options?.blotchiness || 3;
    const DIAMETER_DIFFERENCE = max_diameter - min_diameter;
    return (line, position) => {
        const distance_from_start = Vector2.distance(line.start, position);
        p5.circle(position.x, position.y, min_diameter +
            Math.pow(p5.noise(235.982 + distance_from_start), blotchiness) * DIAMETER_DIFFERENCE);
    };
}
