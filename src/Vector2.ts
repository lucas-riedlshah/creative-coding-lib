export class Vector2 {
  public x: number = 0
  public y: number = 0

  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public clone() {
    return new Vector2(this.x, this.y)
  }

  public set(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add(x: number, y: number): Vector2 {
    return new Vector2(this.x + x, this.y + y)
  }

  public add_vector(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y)
  }

  public add_in_place(x: number, y: number): void {
    this.x += x
    this.y += y
  }

  public add_vector_in_place(other: Vector2): void {
    this.x += other.x
    this.y += other.y
  }
}
