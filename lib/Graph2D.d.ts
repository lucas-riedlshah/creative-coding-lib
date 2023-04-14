import { Vector2 } from "./Vector2";
export declare class Graph2D {
    private _adjacency_matrix;
    private _vertices;
    constructor(points?: Vector2[]);
    get adjacency_matrix(): readonly number[][];
    get vertices(): readonly Vector2[];
    adjacent(vertex_a: Vector2, vertex_b: Vector2): boolean;
    neighbours(vertex: Vector2): Vector2[];
    add_vertex(vertex: Vector2): void;
    remove_vertex(vertex: Vector2): void;
    add_edge(vertex_a: Vector2, vertex_b: Vector2, weight: number): void;
    remove_edge(vertex_a: Vector2, vertex_b: Vector2): void;
    get_edges(): [Vector2, Vector2, number][];
}
export declare function shortest_cycles(graph: Graph2D): Vector2[][];
