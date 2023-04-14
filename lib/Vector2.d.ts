export declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static get zero(): Vector2;
    static get one(): Vector2;
    static get forward(): Vector2;
    static get up(): Vector2;
    get squared_magnitude(): number;
    get magnitude(): number;
    get normalized(): Vector2;
    static distance(u: Vector2, v: Vector2): number;
    static angle(u: Vector2, v: Vector2): number;
    static lerp(u: Vector2, v: Vector2, value: number): Vector2;
    static add(u: Vector2, v: Vector2): Vector2;
    static subtract(u: Vector2, v: Vector2): Vector2;
    static multiply(u: Vector2, x: number): Vector2;
    static dot(u: Vector2, v: Vector2): number;
    static divide(u: Vector2, x: number): Vector2;
    clone(): Vector2;
    to_list(): [number, number];
    set(x: number, y: number): void;
    normalize(): void;
    rotate(theta: number): void;
    add_in_place(other: Vector2): void;
    subtract_in_place(other: Vector2): void;
    multiply_in_place(x: number): void;
    divide_in_place(x: number): void;
}
