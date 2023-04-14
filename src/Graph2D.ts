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

  public get adjacency_matrix(): readonly number[][] { return this._adjacency_matrix }

  public get vertices(): readonly Vector2[] { return this._vertices }

  public adjacent(vertex_a: Vector2, vertex_b: Vector2): boolean {
    const index_a = this._vertices.indexOf(vertex_a)
    const index_b = this._vertices.indexOf(vertex_b)
    return this._adjacency_matrix[index_a][index_b] != 0
  }

  public neighbours(vertex: Vector2): Vector2[] {
    const vertex_index = this._vertices.indexOf(vertex)
    const neighbour_indices = this._adjacency_matrix[vertex_index]
      .map((e, i) => e * i)
      .filter((e, i) => e > 0 || (i === 0 && this._adjacency_matrix[vertex_index][0] > 0)) // extra check for i === 0 because otherwise it will always be filtered out.
    return neighbour_indices.map(i => this._vertices[i])
  }

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

  // public get_edge_weight(vertex_a: Vector2, vertex_b: Vector2): number {
  //   const index_a = this._vertices.indexOf(vertex_a)
  //   const index_b = this._vertices.indexOf(vertex_b)
  //   return this.adjacency_matrix[index_a][index_b]
  // }

  public remove_edge(vertex_a: Vector2, vertex_b: Vector2): void {
    const index_a = this._vertices.indexOf(vertex_a)
    const index_b = this._vertices.indexOf(vertex_b)
    this._adjacency_matrix[index_a][index_b] = 0
    this._adjacency_matrix[index_b][index_a] = 0
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

export function get_smallest_cycles(graph: Graph2D): Vector2[][] {
  const cycles: Vector2[][] = []
  const adjacency_matrix_clone: number[][] = graph.adjacency_matrix.map(row => row.map(w => w)) // deep-clone the matrix

  let next_cycle: Vector2[] | null = find_cycle()
  while (next_cycle !== null) {
    cycles.push(next_cycle)
    next_cycle = find_cycle()
  }

  for (let i = cycles.length - 1; i >= 0; i--) {
    const cycle = cycles[i]
    if (check_cycle_validity(cycle)) continue
    cycles.splice(i, 1)
  }

  return cycles
  
  function find_cycle(): Vector2[] | null {
    const cycle: Vector2[] = []

    const start_index: number | null = find_start_vertex_index()
    if (start_index === null) return null

    let current_index: number = start_index
    let next_index: number = get_out_neighbour_indices(current_index)[0]

    cycle.push(graph.vertices[current_index])
    adjacency_matrix_clone[current_index][next_index] = 0

    while (next_index !== start_index) {
      // Push vertex to the cycle
      cycle.push(graph.vertices[next_index])
      // Find the next vertex
      const out_neighbour_indices: number[] = get_out_neighbour_indices(next_index)
        .filter(i => i !== current_index)
        .sort((a, b) => {
          const angle_a = angle(graph.vertices[current_index], graph.vertices[next_index], graph.vertices[a])
          const angle_b = angle(graph.vertices[current_index], graph.vertices[next_index], graph.vertices[b])
          return angle_a - angle_b
        })
      // update index pointers
      current_index = next_index
      next_index = out_neighbour_indices[0]
      // remove walked edge from the pool
      adjacency_matrix_clone[current_index][next_index] = 0
    }
    
    return cycle
  }

  /**
   * Checks to see if any vertices in the graph are inside of the cycle,
   * as this would indicate this cycle is not a "smallest cycle".
   */
  function check_cycle_validity(cycle: Vector2[]): boolean {
    // Check if cycle contains other points not part of the cycle.
    // TODO: Fix this part - right now we just guess based on the length of the cycle relative to total points in graph.
    if (cycles.length > 1 && cycle.length / graph.vertices.length > 0.4) {
      console.log(cycle.length / graph.vertices.length)
      return false
    }

    // Check for circuits
    const visited: Set<Vector2> = new Set()
    for (const vertex of cycle) {
      if (visited.has(vertex)) {
        return false
      } 
      visited.add(vertex)
    }

    // Check for duplicate cycles
    let is_duplicate
    for (const other of cycles) {
      if (cycle === other || cycle.length !== other.length) continue
      is_duplicate = true
      for (const vertex of cycle) {
        if (other.includes(vertex)) continue
        is_duplicate = false
        break
      }
      if (is_duplicate) {
        return false
      }
    }

    return true
  }

  function find_start_vertex_index(): number | null {
    const start_index: number | null = null
    for (let row = 0; row < adjacency_matrix_clone.length; row++) {
      for (let column = 0; column < adjacency_matrix_clone.length; column++) {
        if (adjacency_matrix_clone[row][column] !== 0) {
          // return the vertex index (aka the row), as soon as we find
          // a vertex that has a neighbour.
          return row 
        }
      }
    }
    return start_index
  }

  function get_out_neighbour_indices(vertex_index: number): number[] {
    return adjacency_matrix_clone[vertex_index]
      .map((e, i) => e * i)
      .filter((e, i) => e > 0 || (i === 0 && adjacency_matrix_clone[vertex_index][0] > 0))
  }

  function angle(a: Vector2, b: Vector2, c: Vector2) {
    const ab = Vector2.subtract(a, b)
    const cb = Vector2.subtract(c, b)
    const angle = Math.atan2(cb.y, cb.x) - Math.atan2(ab.y, ab.x)
    return angle >= 0 ? angle : Math.PI * 2 + angle
  }

  // There will be 2 edge cases:
  // - Fails on graphs with vertices that are not part of any cycle.
  // - The convex hull(s) can be removed via a ray case from any contained point.
}