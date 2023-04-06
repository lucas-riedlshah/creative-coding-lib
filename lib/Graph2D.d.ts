import { Vector2 } from "./Vector2";
export declare class Graph2D {
    private _adjacency_matrix;
    private _vertices;
    constructor(points?: Vector2[]);
    adjacent(vertex_a: Vector2, vertex_b: Vector2): boolean;
    add_vertex(vertex: Vector2): void;
    remove_vertex(vertex: Vector2): void;
    add_edge(vertex_a: Vector2, vertex_b: Vector2, weight: number): void;
    remove_edge(vertex_a: Vector2, vertex_b: Vector2): void;
    get_vertices(): Vector2[];
    get_edges(): [Vector2, Vector2, number][];
}
