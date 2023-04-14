import { Vector2 } from './Vector2';
export class Line {
    start;
    end;
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    get length() {
        return Vector2.subtract(this.end, this.start).magnitude;
    }
    get_segment(start, end) {
        const segment_start = Vector2.lerp(this.start, this.end, Math.max(0, Math.min(1, start)));
        const segment_end = Vector2.lerp(this.start, this.end, Math.max(0, Math.min(1, end)));
        return new Line(segment_start, segment_end);
    }
    draw(brush_callback, resolution = 1) {
        const N = this.length * resolution;
        const step = Vector2.divide(Vector2.subtract(this.end, this.start), N);
        const position = this.start.clone();
        for (let i = 0; i < N; i++) {
            position.add_in_place(step);
            const distance = Vector2.distance(position, this.start);
            brush_callback(position, distance);
        }
    }
    draw_segment(start, end, brush_callback, resolution = 1) {
        const segment = this.get_segment(start, end - Number.EPSILON * 100);
        // segment.draw(brush_callback, resolution)
        const N = segment.length * resolution;
        const step = Vector2.divide(Vector2.subtract(segment.end, segment.start), N);
        const position = segment.start.clone();
        for (let i = 0; i < N; i++) {
            position.add_in_place(step);
            const distance = Vector2.distance(position, this.start);
            brush_callback(position, distance);
        }
    }
}
