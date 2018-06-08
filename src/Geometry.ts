import { NodeId, IGraph } from "./IGraph"
import _ from "lodash"

export type Distance = (graph: IGraph, fromNodeId: NodeId, toNodeId: NodeId) => number
const add = (a: number, b: number) => a + b

export default (distance: Distance) => {
  function totalLength(graph: IGraph, path: NodeId[]): number {
    return path.map((id, i) => {
      const next = path[i + 1]
      return next ? distance(graph, id, next) : 0
    }).reduce(add, 0)
  }

  // 円周
  function getCircumference(graph: IGraph, centerId: NodeId, radiusHops: number): number {
    return totalLength(graph, getNodesAtDistance(graph, centerId, radiusHops))
  }

  function getCircleRatio(graph: IGraph, centerId: NodeId, radiusHops: number): number {
    const c = getCircumference(graph, centerId, radiusHops)
    return c / radiusHops / 2
  }

  // 特定の距離にある全ての node を探す
  function getNodesAtDistance(graph: IGraph, fromId: NodeId, atDistance: number): NodeId[] {
    return graph.nodes
      .map(n => ({ id: n.id, dist: distance(graph, fromId, n.id) }))
      .filter(n => n.dist === atDistance)
      .map(n => n.id)
  }

  // 候補の中から最も from に近い node を探す
  function getNearestNode(graph: IGraph, from: NodeId, candidates: NodeId[]): NodeId {
    return candidates
      .map(id => ({ id, distance: distance(graph, from, id) }))
      .sort((a, b) => a.distance - b.distance)[0].id
  }
  
  // node を近いものが並ぶようにソートする
  function sortNearestNodes(graph: IGraph, from: NodeId, via: NodeId[], to: NodeId): NodeId[] {
    let current = from
    const candidates = _.clone(via)
    const path = [from]

    while(candidates.length > 0) {
      const next = getNearestNode(graph, current, candidates)
      path.push(next)
      _.remove(candidates, x => x === next)
      current = next
    }

    path.push(to)

    return path
  }

  return {
    totalLength,
    getCircumference,
    getCircleRatio,
    getNodesAtDistance,
    getNearestNode,
    sortNearestNodes
  }
}
