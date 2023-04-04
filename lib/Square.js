import { Vector2 } from './Vector2';
export class Square {
    constructor(position_x, position_y, width, height) {
        this.position = new Vector2(position_x, position_y);
        this.width = Math.abs(height ? width : width * 2);
        this.height = Math.abs(height ? height : width * 2);
    }
    get_random_point(random) {
        const min_x = this.position.x - this.width / 2;
        const x = min_x + random() * this.width;
        const min_y = this.position.y - this.height / 2;
        const y = min_y + random() * this.height;
        return new Vector2(x, y);
    }
    contains(point) {
        return (point.x >= this.position.x - this.width / 2 &&
            point.x <= this.position.x + this.width / 2 &&
            point.y >= this.position.y - this.height / 2 &&
            point.y <= this.position.y + this.height / 2);
    }
}
