export class Emitter {
    constructor(shape) {
        this._emitted_objects = [];
        this.shape = shape;
    }
    get_emitted_objects() {
        return this._emitted_objects;
    }
    emit(callback, random, n = 100) {
        const result = [];
        for (let i = 0; i < n; i++) {
            const position = this.shape.get_random_point(random);
            const new_object = callback(position.x, position.y);
            result.push(new_object);
            this._emitted_objects.push(new_object);
        }
        return result;
    }
}
