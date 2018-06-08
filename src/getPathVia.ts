import { NodeId, IGraph } from "./IGraph"

type ShortestPathFunc = (graph: IGraph, from: NodeId, to: NodeId) => NodeId[]

export function getPathVia(graph: IGraph, nodeIds: NodeId[], getShortestPath: ShortestPathFunc): NodeId[] {
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