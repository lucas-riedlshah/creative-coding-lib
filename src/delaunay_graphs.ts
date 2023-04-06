import Delaunator from 'delaunator';

import { Graph2D } from "./Graph2D";
import { Vector2 } from "./Vector2";

export function generate_delaunay_triagulation_graph(points: Vector2[]): Graph2D {
  const delaunay = Delaunator.from(points, (point) => point.x, (point) => point.y)
  return delaunator_to_graph_2d(points, delaunay)
}

export function generate_voronoi_graph(points: Vector2[]): Graph2D {
  const delaunay = Delaunator.from(points, (point) => point.x, (point) => point.y)
  const graph = new Graph2D(points)
  for (let e = 0; e < delaunay.triangles.length; e++) {
    if (e < delaunay.halfedges[e]) {
        const p = triangleCenter(points, delaunay, triangle_n_of_edge(e));
        const q = triangleCenter(points, delaunay, triangle_n_of_edge(delaunay.halfedges[e]));
        graph.add_vertex(p)
        graph.add_vertex(q)
        graph.add_edge(p, q, 1);
    }
  }
  return graph

  function edges_of_triangle(triangle_n: number): [number, number, number] { 
    return [3 * triangle_n, 3 * triangle_n + 1, 3 * triangle_n + 2]; 
  }

  function triangle_n_of_edge(edge_n: number): number { 
    return Math.floor(edge_n / 3); 
  }
  
  function pointsOfTriangle(delaunay: Delaunator<Vector2>, t: number): [number, number, number] {
    return edges_of_triangle(t)
        .map(e => delaunay.triangles[e]) as [number, number, number];
  }

  function circumcenter(triangle_vertices: [Vector2, Vector2, Vector2]): Vector2 {
    const a = triangle_vertices[0]
    const b = triangle_vertices[1]
    const c = triangle_vertices[2]

    const a_squared_magnitude = a.squared_magnitude;
    const b_squared_magnitude = b.squared_magnitude;
    const c_squared_magnitude = c.squared_magnitude;
    const D = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.x));

    return new Vector2(
        1 / D * (a_squared_magnitude * (b.y - c.y) + b_squared_magnitude * (c.y - a.y) + c_squared_magnitude * (a.y - b.y)),
        1 / D * (a_squared_magnitude * (c.x - b.x) + b_squared_magnitude * (a.x - c.x) + c_squared_magnitude * (b.x - a.x)),
    );
  }

  function triangleCenter(points: Vector2[], delaunay: Delaunator<Vector2>, t: number) {
    const vertices = pointsOfTriangle(delaunay, t).map(p => points[p]) as [Vector2, Vector2, Vector2];
    return circumcenter(vertices);
  }
}

export function generate_urquhart_graph(points: Vector2[]): Graph2D {
  const delaunay = Delaunator.from(points, (point) => point.x, (point) => point.y)
  const graph = delaunator_to_graph_2d(points, delaunay)

  for (let i = 0; i < delaunay.triangles.length; i += 3) {
    const vertex_a = points[delaunay.triangles[i]]
    const vertex_b = points[delaunay.triangles[i + 1]]
    const vertex_c = points[delaunay.triangles[i + 2]]

    const edges: [Vector2, Vector2][] = [[vertex_a, vertex_b], [vertex_b, vertex_c], [vertex_c, vertex_a]]

    edges.sort((edge_x, edge_y) => Vector2.distance(...edge_x) - Vector2.distance(...edge_y))

    graph.remove_edge(...edges[2])
  }

  return graph
}

function delaunator_to_graph_2d(points: Vector2[], delaunator: Delaunator<Vector2>): Graph2D {
  const graph = new Graph2D(points)
  for (let e = 0; e < delaunator.triangles.length; e++) {
    if (e > delaunator.halfedges[e]) {
      const p = points[delaunator.triangles[e]];
      const q = points[delaunator.triangles[(e % 3 === 2) ? e - 2 : e + 1]];
      graph.add_edge(p, q, 1)
    }
  }
  return graph
}