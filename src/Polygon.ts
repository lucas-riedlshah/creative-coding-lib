import earcut from 'earcut'

import { Vector2 } from './Vector2'
import { IShape } from './IShape'
import { Triangle } from './Triangle'

export class Polygon implements IShape {
  public vertices: Vector2[]

  public constructor(vertices: Vector2[]) {
    this.vertices = vertices
  }

  public get position(): Vector2 {
    const center_position = Vector2.zero
    for (const v of this.vertices) center_position.add_in_place(v)
    center_position.divide_in_place(this.vertices.length)
    return center_position
  }

  public set position(new_position: Vector2) {
    const translation = Vector2.subtract(new_position, this.position)
    for (const v of this.vertices) v.add_in_place(translation)
  }

  public get_triangulation(): Triangle[] {
    const triangles: Triangle[] = []

    const flattened_vertices: number[] = []
    for (const v of this.vertices) flattened_vertices.push(v.x, v.y)

    const triangle_indices = earcut(flattened_vertices)

    for (let i = 0; i < triangle_indices.length; i += 3) {
      triangles.push(
        new Triangle(
          this.vertices[triangle_indices[i]],
          this.vertices[triangle_indices[i + 1]],
          this.vertices[triangle_indices[i + 2]]
        )
      )
    }

    return triangles
  }

  get_area(): number {
    return this.get_triangulation().map(triangle => triangle.get_area()).reduce((partial_sum, e) => partial_sum + e)
  }

  get_random_point(random_func: () => number): Vector2 {
    const triangles = this.get_triangulation()
    const triangle_areas = triangles.map(triangle => triangle.get_area())
    
    let i;

    for (i = 1; i < triangle_areas.length; i++)
      triangle_areas[i] += triangle_areas[i - 1]

    const r = random_func() * triangle_areas[i - 1]

    for (i = 0; i < triangle_areas.length; i++)
      if (triangle_areas[i] > r) break

    return triangles[i].get_random_point(random_func)
  }

  contains(point: Vector2): boolean {
    for (const triangle of this.get_triangulation()) {
      if (triangle.contains(point)) return true
    }
    return false
  }
}
