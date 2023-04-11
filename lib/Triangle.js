import { Vector2 } from './Vector2';
export class Triangle {
    a;
    b;
    c;
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    get position() {
        const center_position = Vector2.add(this.a, this.b);
        center_position.add_in_place(this.c);
        center_position.divide_in_place(3);
        return center_position;
    }
    set position(new_position) {
        const translation = Vector2.subtract(new_position, this.position);
        this.a.add_in_place(translation);
        this.b.add_in_place(translation);
        this.c.add_in_place(translation);
    }
    get_area() {
        return 0.5 * Math.abs(this.a.x * (this.b.y - this.c.y) +
            this.b.x * (this.c.y - this.a.y) +
            this.c.x * (this.a.y - this.b.y));
    }
    get_random_point(random_func) {
        const r1 = Math.sqrt(random_func());
        const r2 = random_func();
        return Vector2.add(Vector2.add(Vector2.multiply(this.a, 1 - r1), Vector2.multiply(this.b, r1 * (1 - r2))), Vector2.multiply(this.c, r1 * r2));
    }
    contains(point) {
        function sign(p1, p2, p3) {
            return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
        }
        const d1 = sign(point, this.a, this.b);
        const d2 = sign(point, this.b, this.c);
        const d3 = sign(point, this.c, this.a);
        const has_neg = d1 < 0 || d2 < 0 || d3 < 0;
        const has_pos = d1 > 0 || d2 > 0 || d3 > 0;
        return !(has_neg && has_pos);
    }
}
