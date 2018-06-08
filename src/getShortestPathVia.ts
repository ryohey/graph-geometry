import { NodeId, IGraph } from "./IGraph"
import { getShortestPath, ShortestPathFunc, getDijkstraDistance } from "./getShortestPath"
import Geometry from "./Geometry"
import { getPathVia } from "./getPathVia"

export default (shortestPath: ShortestPathFunc) => {
  const { sortNearestNodes } = Geometry(getDijkstraDistance)

  return {
    // 与えられた中間点を通る最短の経路を計算する
    getShortestPathVia(graph: IGraph, from: NodeId, via: NodeId[], to: NodeId): NodeId[] {
      const nodes = sortNearestNodes(graph, from, via, to)
      return getPathVia(graph, nodes, getShortestPath)
    },
  }
}
