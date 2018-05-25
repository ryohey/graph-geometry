import { NodeId, IGraph } from "./IGraph"

export type Distance = (graph: IGraph, fromNodeId: NodeId, toNodeId: NodeId) => number
const add = (a: number, b: number) => a + b

export default (distance: Distance) => ({
  totalLength(graph: IGraph, path: NodeId[]): number {
    return path.map((id, i) => {
      const next = path[i + 1]
      return next ? distance(graph, id, next) : 0
    }).reduce(add, 0)
  },

  // 円周
  getCircumference(graph: IGraph, centerId: NodeId, radiusHops: number): number {
    return this.totalLength(graph, this.getNodesAtDistance(graph, centerId, radiusHops))
  },

  getCircleRatio(graph: IGraph, centerId: NodeId, radiusHops: number): number {
    const c = this.getCircumference(graph, centerId, radiusHops)
    return c / radiusHops / 2
  },

  getNodesAtDistance(graph: IGraph, fromId: NodeId, atDistance: number): NodeId[] {
    return graph.nodes
      .map(n => ({ id: n.id, dist: distance(graph, fromId, n.id) }))
      .filter(n => n.dist === atDistance)
      .map(n => n.id)
  }
})