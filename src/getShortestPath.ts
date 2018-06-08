import { INode, NodeId, IGraph } from "./IGraph"
import { Distance } from "./Geometry"

export type ShortestPathFunc = (graph: IGraph, from: NodeId, to: NodeId) => NodeId[]

interface DNode extends INode {
  cost: number
  done: boolean
  to: NodeId[]
  prev: DNode|undefined
}

// Dijkstra's algorithm
export function getShortestPath(graph: IGraph, from: NodeId, to: NodeId): NodeId[] {
  const nodes: DNode[] = graph.nodes.map(n => {
    const toNode = graph.edges.filter(e => e.from === n.id || e.to === n.id).map(e => (e.from === n.id ? e.to : e.from))
    return {
      ...n,
      done: false,
      cost: n.id === from ? 0 : -1, // スタートノードのコストは0
      to: toNode,
      prev: undefined
    }
  })
  while (true) {
    // 確定ノードを探す
    let doneNode: DNode | undefined
    for (const node of nodes) {
      if (node.done || node.cost < 0) {
        continue
      }

      if (doneNode === undefined || 
          node.cost < doneNode.cost) {
        doneNode = node
      }
    }

    // 確定ノードがなくなれば終了
    if (doneNode === undefined) {
      break
    }

    // 確定フラグを立てる
    doneNode.done = true

    // 接続先ノードの情報を更新する
    for (const toNode of doneNode.to) {
      const node = nodes.find(n => n.id === toNode) as DNode
      const cost = doneNode.cost + 1 // 各エッジの重みは全て 1
      if (node.cost < 0 || cost < node.cost) {
        node.cost = cost
        node.prev = doneNode
      }
    }
  }

  let current = nodes.find(n => n.id === to) as DNode
  const path: NodeId[] = [to]

  while (true) {
    const next = current.prev
    if (!next) {
      break
    }
    path.unshift(next.id)
    current = next
  }

  return path
}

export const getDijkstraDistance: Distance = (graph: IGraph, from: NodeId, to: NodeId): number => {
  return getShortestPath(graph, from, to).length
}
