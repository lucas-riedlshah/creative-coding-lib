import { Vector2 } from "./Vector2";
export class Circle {
    constructor(x, y, inner_radius, outer_radius = 0) {
        this.position = new Vector2(x, y);
        this.inner_radius = Math.min(inner_radius, outer_radius);
        this.outer_radius = Math.max(inner_radius, outer_radius);
    }
    get_random_point(random) {
        const theta = random() * Math.PI * 2;
        const r = Math.sqrt(random());
        const magnitude = this.inner_radius + (this.outer_radius - this.inner_radius) * r;
        const x = this.position.x + magnitude * Math.cos(theta);
        const y = this.position.y + magnitude * Math.sin(theta);
        return new Vector2(x, y);
    }
    contains(point) {
        const d = Vector2.distance(this.position, point);
        return d > this.inner_radius && d < this.outer_radius;
    }
}
