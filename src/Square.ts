import { IPositionable } from './IPositionable'
import { IShape } from './IShape'
import { Vector2 } from './Vector2'

export class Square implements IShape, IPositionable {
  public position: Vector2
  public width: number
  public height: number

  public constructor(position_x: number, position_y: number, radius: number)
  public constructor(
    position_x: number,
    position_y: number,
    width: number,
    height: number
  )
  public constructor(
    position_x: number,
    position_y: number,
    width: number,
    height?: number
  ) {
    this.position = new Vector2(position_x, position_y)
    this.width = Math.abs(height ? width : width * 2)
    this.height = Math.abs(height ? height : width * 2)
  }

  public get_random_point(random: () => number): Vector2 {
    const min_x = this.position.x - this.width / 2
    const x = min_x + random() * this.width

    const min_y = this.position.y - this.height / 2
    const y = min_y + random() * this.height

    return new Vector2(x, y)
  }

  public contains(point: Vector2): boolean {
    return (
      point.x >= this.position.x - this.width / 2 &&
      point.x <= this.position.x + this.width / 2 &&
      point.y >= this.position.y - this.height / 2 &&
      point.y <= this.position.y + this.height / 2
    )
  }
}
