export declare class Vector2 {
    x: number;
    y: number;
    static get zero(): Vector2;
    static get one(): Vector2;
    get squared_magnitude(): number;
    get magnitude(): number;
    get normalized(): Vector2;
    constructor(x: number, y: number);
    static distance(u: Vector2, v: Vector2): number;
    clone(): Vector2;
    set(x: number, y: number): void;
    normalize(): void;
    add(x: number, y: number): Vector2;
    add_vector(other: Vector2): Vector2;
    add_in_place(x: number, y: number): void;
    add_vector_in_place(other: Vector2): void;
    subtract(x: number, y: number): Vector2;
    subtract_vector(other: Vector2): Vector2;
    subtract_in_place(x: number, y: number): void;
    subtract_vector_in_place(other: Vector2): void;
    multiply(x: number): Vector2;
    multiply_in_place(x: number): void;
    dot(x: number, y: number): Vector2;
    dot_vector(other: Vector2): Vector2;
    dot_in_place(x: number, y: number): void;
    dot_vector_in_place(other: Vector2): void;
}
