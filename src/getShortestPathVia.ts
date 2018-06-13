import { NodeId, IGraph } from "./IGraph"
import Geometry, { Distance } from "./Geometry"
import Path, { ShortestPathFunc } from "./Path"

export default (shortestPath: ShortestPathFunc, distance: Distance) => {
  const { sortNearestNodes } = Geometry(distance)
  const { getPathVia } = Path(shortestPath)

  return {
    // 与えられた中間点を通る最短の経路を計算する
    getShortestPathVia(graph: IGraph, from: NodeId, via: NodeId[], to: NodeId): NodeId[] {
      const nodes = sortNearestNodes(graph, from, via, to)
      return getPathVia(graph, nodes)
    },
  }
}
