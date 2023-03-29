"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
const Vector2_1 = require("./Vector2");
class Particle {
    get position() { return this._position; }
    get velocity() { return this._velocity; }
    get acceleration() { return this._acceleration; }
    constructor(x, y) {
        this._position = new Vector2_1.Vector2(0, 0);
        this._velocity = new Vector2_1.Vector2(0, 0);
        this._acceleration = new Vector2_1.Vector2(0, 0);
        this._position = new Vector2_1.Vector2(x, y);
    }
    update_position() {
        this._velocity.add_vector_in_place(this._acceleration);
        this._position.add_vector_in_place(this._velocity);
        this._acceleration.x = 0;
        this._acceleration.y = 0;
    }
    update() {
        this.update_position();
    }
    apply_force(x, y) {
        this._acceleration.add_in_place(x, y);
    }
    move_to(x, y) {
        this._position;
    }
}
exports.Particle = Particle;
