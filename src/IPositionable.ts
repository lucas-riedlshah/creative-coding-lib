export interface IPositionable {
  get x(): number
  get y(): number
  get position(): [number, number]
  // set_position(new_position: [number, number]): void
  set_position(x: number, y: number): void
  // set_x_position(x: number): void
  // set_y_position(y: number): void
}