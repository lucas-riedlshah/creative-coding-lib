import p5 from "p5";
import { Vector2 } from "./Vector2";
import { Line } from ".";

export function generate_pencil_brush(
  p5: p5,
  brush_diameter = 2,
  density = 3,
  diameter_variability = 1,
  noise_scale = 0.05,
  bristle_diameter = 1,
) {
  const BRUSH_DIAMETER = brush_diameter;
  const DIAMETER_VARIABILITY = Math.max(0, Math.min(1, diameter_variability));
  const DENSITY = density;
  const BRISTLE_DIAMETER = bristle_diameter;

  return (line: Line, position: Vector2, distance_from_start: number) => {
    const diameter =
      BRUSH_DIAMETER -
      BRUSH_DIAMETER * DIAMETER_VARIABILITY * p5.noise(line.start.x, line.start.y, distance_from_start * noise_scale);
    const N = DENSITY * diameter;
    for (let i = 0; i < (N < 1 ? +(p5.random() < N) : N); i++) {
      const offsetted_position = Vector2.forward;
      offsetted_position.rotate(p5.random() * Math.PI * 2);
      offsetted_position.multiply_in_place(
        Math.sqrt(p5.random()) * diameter * 0.5
      );
      offsetted_position.add_in_place(position);
      p5.circle(offsetted_position.x, offsetted_position.y, BRISTLE_DIAMETER);
    }
  };
}

export function generate_ink_brush(
  p5: p5,
  blotchiness = 3,
  min_diameter = 0.5,
  max_diameter = 5
) {
  const MIN_DIAMETER = Math.min(min_diameter, max_diameter);
  const MAX_DIAMETER = Math.max(min_diameter, max_diameter);
  const BLOTCHINESS = blotchiness;

  const DIAMETER_DIFFERENCE = MAX_DIAMETER - MIN_DIAMETER;

  return (_line: Line, position: Vector2, distance_from_start: number) => {
    p5.circle(
      position.x,
      position.y,
      MIN_DIAMETER +
        Math.pow(p5.noise(235.982 + distance_from_start), BLOTCHINESS) * DIAMETER_DIFFERENCE
    );
  };
}
