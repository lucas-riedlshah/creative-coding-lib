export class ShapedEmitter {
    _emitted_objects = [];
    _shape;
    constructor(shape) {
        this._shape = shape;
    }
    get_emitted_objects() {
        return this._emitted_objects;
    }
    emit(callback, n, random) {
        const result = [];
        for (let i = 0; i < n; i++) {
            const position = this._shape.get_random_point(random);
            const new_object = callback(position.x, position.y);
            result.push(new_object);
            this._emitted_objects.push(new_object);
        }
        return result;
    }
}
