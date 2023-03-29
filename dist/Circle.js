import { Vector2 } from "./Vector2";
export class Circle {
    constructor(x, y, inner_radius, outer_radius = 0) {
        this.x = 0;
        this.y = 0;
        this.inner_radius = 0;
        this.outer_radius = 100;
        this.x = x;
        this.y = y;
        this.inner_radius = Math.min(inner_radius, outer_radius);
        this.outer_radius = Math.max(inner_radius, outer_radius);
    }
    get_random_point(random) {
        const theta = random() * Math.PI * 2;
        const r = Math.sqrt(random());
        const magnitude = this.inner_radius + (this.outer_radius - this.inner_radius) * r;
        const x = this.x + magnitude * Math.cos(theta);
        const y = this.y + magnitude * Math.sin(theta);
        return new Vector2(x, y);
    }
}
