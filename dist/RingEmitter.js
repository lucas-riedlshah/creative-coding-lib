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
    emit(callback, n = 100) {
        const result = [];
        for (let i = 0; i < n; i++) {
            const angle = Math.random() * Math.PI * 2;
            const x = this._x + this._radius * Math.cos(angle);
            const y = this._y + this._radius * Math.sin(angle);
            const new_object = callback(x, y);
            result.push(new_object);
            this._emitted_objects.push(new_object);
        }
        return result;
    }
}
exports.RingEmitter = RingEmitter;
