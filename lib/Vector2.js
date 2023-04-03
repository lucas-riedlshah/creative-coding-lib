export class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get one() {
        return new Vector2(1, 1);
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
        return new Vector2(u.x * v.x, u.y * v.y);
    }
    static divide(u, x) {
        return new Vector2(u.x / x, u.y / x);
    }
    clone() {
        return new Vector2(this.x, this.y);
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
    dot_in_place(other) {
        this.x *= other.x;
        this.y *= other.y;
    }
    divide_in_place(x) {
        this.x /= x;
        this.y /= x;
    }
}