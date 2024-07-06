export class Vector2 {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get one() {
        return new Vector2(1, 1);
    }
    static get forward() {
        return new Vector2(1, 0);
    }
    static get up() {
        return new Vector2(0, 1);
    }
    get squared_magnitude() {
        return this.x * this.x + this.y * this.y;
    }
    get magnitude() {
        return Math.sqrt(this.squared_magnitude);
    }
    get normalized() {
        return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
    }
    static distance(u, v) {
        return Vector2.subtract(u, v).magnitude;
    }
    static angle(u, v) {
        return Math.atan2(u.x * v.y - v.x * u.y, u.x * v.x - u.y * v.y);
    }
    static lerp(u, v, value) {
        const relative_end = Vector2.subtract(v, u);
        return new Vector2(u.x + value * relative_end.x, u.y + value * relative_end.y);
    }
    static add(u, v) {
        return new Vector2(u.x + v.x, u.y + v.y);
    }
    static subtract(u, v) {
        return new Vector2(u.x - v.x, u.y - v.y);
    }
    static multiply(u, x) {
        return new Vector2(u.x * x, u.y * x);
    }
    static dot(u, v) {
        return u.x * v.x + u.y * v.y;
    }
    static cross(u, v) {
        return u.x * v.y - u.y * v.x;
    }
    static divide(u, x) {
        return new Vector2(u.x / x, u.y / x);
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    to_list() {
        return [this.x, this.y];
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    normalize() {
        const m = this.magnitude;
        this.x /= m;
        this.y /= m;
    }
    rotate(theta) {
        const sin_theta = Math.sin(theta);
        const cos_theta = Math.cos(theta);
        const old_x = this.x;
        const old_y = this.y;
        this.x = cos_theta * old_x - sin_theta * old_y;
        this.y = sin_theta * old_x + cos_theta * old_y;
    }
    // UNTESTED
    // public rotate_around(pivot: Vector2, theta: number) {
    //   const magnitude = this.magnitude
    //   this.subtract_in_place(pivot)
    //   this.x = magnitude * Math.cos(theta)
    //   this.y = magnitude * Math.sin(theta)
    //   this.add_in_place(pivot)
    // }
    add_in_place(other) {
        this.x += other.x;
        this.y += other.y;
    }
    subtract_in_place(other) {
        this.x -= other.x;
        this.y -= other.y;
    }
    multiply_in_place(x) {
        this.x *= x;
        this.y *= x;
    }
    divide_in_place(x) {
        this.x /= x;
        this.y /= x;
    }
}
