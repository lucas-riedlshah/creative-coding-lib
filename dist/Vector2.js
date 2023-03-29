export class Vector2 {
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
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
}
