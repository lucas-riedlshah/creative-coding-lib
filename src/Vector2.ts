export class Vector2 {
  public x = 0
  public y = 0

  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public static get zero(): Vector2 {
    return new Vector2(0, 0)
  }

  public static get one(): Vector2 {
    return new Vector2(1, 1)
  }
  
  public get squared_magnitude() {
    return this.x * this.x + this.y * this.y
  }
  
  public get magnitude() {
    return Math.sqrt(this.squared_magnitude)
  }

  public get normalized() {
    return new Vector2(this.x / this.magnitude, this.y / this.magnitude)
  }

  public static distance(u: Vector2, v: Vector2) {
    return Vector2.subtract(u, v).magnitude
  }

  public static add(u: Vector2, v: Vector2): Vector2 {
    return new Vector2(u.x + v.x, u.y + v.y)
  }

  public static subtract(u: Vector2, v: Vector2): Vector2 {
    return new Vector2(u.x - v.x, u.y - v.y)
  }

  public static multiply(u: Vector2, x: number): Vector2 {
    return new Vector2(u.x * x, u.y * x)
  }

  public static dot(u: Vector2, v: Vector2): Vector2 {
    return new Vector2(u.x * v.x, u.y * v.y)
  }

  public static divide(u: Vector2, x: number): Vector2 {
    return new Vector2(u.x / x, u.y / x)
  }

  public clone() {
    return new Vector2(this.x, this.y)
  }

  public set(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public normalize() {
    const m = this.magnitude
    this.x /= m
    this.y /= m
  }

  public add_in_place(other: Vector2): void {
    this.x += other.x
    this.y += other.y
  }

  public subtract_in_place(other: Vector2): void {
    this.x -= other.x
    this.y -= other.y
  }

  public multiply_in_place(x: number): void {
    this.x *= x
    this.y *= x
  }

  public dot_in_place(other: Vector2): void {
    this.x *= other.x
    this.y *= other.y
  }

  public divide_in_place(x: number): void {
    this.x /= x
    this.y /= x
  }
}
