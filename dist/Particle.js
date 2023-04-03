import { Vector2 } from "./Vector2";
export class Particle {
    constructor(x, y, mass = 1, lifetime = Infinity) {
        this.age = 0;
        this.dead = false;
        this._position = new Vector2(0, 0);
        this._velocity = new Vector2(0, 0);
        this._acceleration = new Vector2(0, 0);
        this._position = new Vector2(x, y);
        this.mass = mass;
        this.lifetime = lifetime;
    }
    get position() { return this._position; }
    get velocity() { return this._velocity; }
    get acceleration() { return this._acceleration; }
    update() {
        if (this.dead)
            return;
        this.age++;
        if (this.age > this.lifetime)
            this.dead = true;
        this._update_position();
    }
    apply_force(force) {
        this._acceleration.add_in_place(Vector2.divide(force, this.mass));
    }
    emit(callback, n) {
        const result = [];
        for (let i = 0; i < n; i++)
            result.push(callback(this.position.x, this.position.y));
        return result;
    }
    _update_position() {
        this._velocity.add_in_place(this._acceleration);
        this._position.add_in_place(this._velocity);
        this._acceleration.set(0, 0);
    }
}
