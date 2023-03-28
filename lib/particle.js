"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
class Particle {
    constructor(x, y) {
        this._position = [0, 0];
        this._velocity = [0, 0];
        this._acceleration = [0, 0];
        this._position = [x, y];
    }
    get x() {
        return this._position[0];
    }
    get y() {
        return this._position[1];
    }
    get position() {
        return this._position;
    }
    get velocity() {
        return this._velocity;
    }
    get acceleration() {
        return this._acceleration;
    }
    update_position() {
        this._velocity[0] += this._acceleration[0];
        this._velocity[1] += this._acceleration[1];
        this._position[0] += this._velocity[0];
        this._position[1] += this._velocity[1];
        this._acceleration[0] = 0;
        this._acceleration[1] = 0;
    }
    update() {
        this.update_position();
    }
    apply_force(x, y) {
        this._acceleration[0] += x;
        this._acceleration[1] += y;
    }
    set_position(x, y) {
        this._position[0] = x;
        this._position[1] = y;
    }
}
exports.Particle = Particle;
