// TODO:
// - Maybe create and IVertex that would store the vertex index, it'd then need to be updated 
//   by Graph for all vertices during remove_vertex().
// - This is not a great implementation to begin with so probably just scrap and restart aye?

import { Vector2 } from "./Vector2"

export class Graph2D {
  private _adjacency_matrix: number[][] = []
  private _vertices: Vector2[] = []

  public constructor(points?: Vector2[]) {
    if (points) {
      this._vertices = points
      this._adjacency_matrix = Array(points.length).fill(0).map(() => Array(points.length).fill(0))
    }
  }

  public adjacent(vertex_a: Vector2, vertex_b: Vector2): boolean {
    const index_a = this._vertices.indexOf(vertex_a)
    const index_b = this._vertices.indexOf(vertex_b)
    return this._adjacency_matrix[index_a][index_b] != 0
  }

  // public neighbours(vertex: Vector2): readonly Vector2[] {
  //   const index = this._vertices.indexOf(vertex)
  //   return this._adjacency_matrix[index].filter(e => e != 0)
  // }

  public add_vertex(vertex: Vector2) {
    if (this._vertices.includes(vertex)) return
    
    const n_vertices = this._vertices.push(vertex)
    this._adjacency_matrix.forEach(row => row.push(0))
    this._adjacency_matrix.push(Array(n_vertices).fill(0))
  }

  public remove_vertex(vertex: Vector2): void {
    const index = this._vertices.indexOf(vertex)
    this._vertices.splice(index, 1)
    this._adjacency_matrix.splice(index, 1)
    this._adjacency_matrix.forEach(row => row.splice(index, 1))
  }

  public add_edge(vertex_a: Vector2, vertex_b: Vector2, weight: number): void {
    const index_a = this._vertices.indexOf(vertex_a)
    const index_b = this._vertices.indexOf(vertex_b)
    this._adjacency_matrix[index_a][index_b] = weight
    this._adjacency_matrix[index_b][index_a] = weight
  }

  public remove_edge(vertex_a: Vector2, vertex_b: Vector2): void {
    const index_a = this._vertices.indexOf(vertex_a)
    const index_b = this._vertices.indexOf(vertex_b)
    this._adjacency_matrix[index_a][index_b] = 0
    this._adjacency_matrix[index_b][index_a] = 0
  }

  public get_vertices(): Vector2[] { 
    return this._vertices
  }

  public get_edges(): [Vector2, Vector2, number][] {
    const edges: [Vector2, Vector2, number][] = []
    for (let row = 0; row < this._adjacency_matrix.length; row++) {
      for (let column = row; column < this._adjacency_matrix.length; column++) {
        if (this._adjacency_matrix[row][column] != 0) {
          const vertex_a = this._vertices[row]
          const vertex_b = this._vertices[column]
          edges.push([vertex_a, vertex_b, this._adjacency_matrix[row][column]])
        }
      }
    }
    return edges
  }
}