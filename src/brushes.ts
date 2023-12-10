import p5 from "p5";
import { Vector2 } from "./Vector2";
import { ICurve } from "./ICurve";

export function generate_pencil_brush(
  p5: p5,
  options?: {
    brush_diameter?: number,
    density?: number,
    diameter_variability?: number,
    noise_scale?: number,
    bristle_diameter?: number,
    bristle_radial_distribution_func?: () => number
  }
) {
  const brush_diameter = options?.brush_diameter || 2
  const density = options?.density || 3
  const diameter_variability = options?.diameter_variability ? Math.max(0, Math.min(1, options.diameter_variability)) : 1
  const bristle_diameter = options?.bristle_diameter || 1
  const noise_scale = options?.noise_scale || 0.05
  const bristle_radial_distribution_func = options?.bristle_radial_distribution_func || (() => Math.sqrt(p5.random()))

  return (curve: ICurve, position: Vector2) => {
    const distance_from_start = Vector2.distance(curve.start, position)
    const diameter =
      brush_diameter -
      brush_diameter * diameter_variability * p5.noise(curve.start.x, curve.start.y, distance_from_start * noise_scale);
    const N = density * diameter;
    for (let i = 0; i < (N < 1 ? +(p5.random() < N) : N); i++) {
      const offsetted_position = Vector2.forward;
      offsetted_position.rotate(p5.random() * Math.PI * 2);
      offsetted_position.multiply_in_place(
        bristle_radial_distribution_func() * diameter * 0.5
      );
      offsetted_position.add_in_place(position);
      p5.circle(offsetted_position.x, offsetted_position.y, bristle_diameter);
    }
  };
}

export function generate_ink_brush(
  p5: p5,
  options?: {
    min_diameter?: number,
    max_diameter?: number,
    blotchiness?: number,
    noise_scale?: number,
  },
) {
  const temp_min = options?.min_diameter || 0.5
  const temp_max = options?.max_diameter || 5
  const min_diameter = Math.min(temp_min, temp_max)
  const diameter_difference = Math.abs(temp_min - temp_max);
  const blotchiness = options?.blotchiness || 3
  const noise_scale = options?.noise_scale || 0.05

  const noise_offset_x = p5.random() * 100000
  const noise_offset_y = p5.random() * 100000
  const noise_offset_z = p5.random() * 100000

  return (curve: ICurve, position: Vector2) => {
    const distance_from_start = Vector2.distance(curve.start, position)
    p5.circle(
      position.x,
      position.y,
      min_diameter +
        Math.pow(p5.noise(noise_offset_x + curve.start.x, noise_offset_y + curve.start.y, noise_offset_z + distance_from_start * noise_scale), blotchiness) * diameter_difference
    );
  };
}
