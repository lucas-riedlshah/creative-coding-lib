"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RingEmitter = void 0;
class RingEmitter {
    constructor(x = 0, y = 0, radius = 10) {
        this._emitted_objects = [];
        this._x = x;
        this._y = y;
        this._radius = radius;
    }
    get_emitted_objects() {
        return this._emitted_objects;
    }
    emit(type, n = 100) {
        const result = [];
        for (let i = 0; i < n; i++) {
            const new_object = new type();
            const angle = Math.random() * Math.PI * 2;
            new_object.set_position(this._x + this._radius * Math.cos(angle), this._y + this._radius * Math.sin(angle));
            result.push(new_object);
            this._emitted_objects.push(new_object);
        }
        return result;
    }
}
exports.RingEmitter = RingEmitter;
