export class Vector2 {
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
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    static distance(u, v) {
        return u.subtract_vector(v).magnitude;
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
    add(x, y) {
        return new Vector2(this.x + x, this.y + y);
    }
    add_vector(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    add_in_place(x, y) {
        this.x += x;
        this.y += y;
    }
    add_vector_in_place(other) {
        this.x += other.x;
        this.y += other.y;
    }
    subtract(x, y) {
        return new Vector2(this.x - x, this.y - y);
    }
    subtract_vector(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    subtract_in_place(x, y) {
        this.x -= x;
        this.y -= y;
    }
    subtract_vector_in_place(other) {
        this.x -= other.x;
        this.y -= other.y;
    }
    multiply(x) {
        return new Vector2(this.x * x, this.y * x);
    }
    multiply_in_place(x) {
        this.x *= x;
        this.y *= x;
    }
    dot(x, y) {
        return new Vector2(this.x * x, this.y * y);
    }
    dot_vector(other) {
        return new Vector2(this.x * other.x, this.y * other.y);
    }
    dot_in_place(x, y) {
        this.x *= x;
        this.y *= y;
    }
    dot_vector_in_place(other) {
        this.x *= other.x;
        this.y *= other.y;
    }
}
