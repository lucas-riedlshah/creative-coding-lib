export declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    clone(): Vector2;
    set(x: number, y: number): void;
    add(x: number, y: number): Vector2;
    add_vector(other: Vector2): Vector2;
    add_in_place(x: number, y: number): void;
    add_vector_in_place(other: Vector2): void;
}
