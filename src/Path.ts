import { NodeId, IGraph } from "./IGraph"

export type ShortestPathFunc = (graph: IGraph, from: NodeId, to: NodeId) => NodeId[]

export default (getShortestPath: ShortestPathFunc) => {
  // 与えられた中間点を順番通りに最短距離で通る経路を計算する
  function getPathVia(graph: IGraph, nodeIds: NodeId[]): NodeId[] {
    const path: NodeId[] = []

    nodeIds.forEach((id, i) => {
      const next = nodeIds[i + 1]
      if (!next) {
        return
      }
      const subpath = getShortestPath(graph, id, next)
      path.push(...subpath.slice(0, -1)) // 重複するので最後を取り除いて追加する
    })

    path.push(nodeIds[nodeIds.length - 1])

    return path
  }

  return {
    getPathVia,
  }
}
