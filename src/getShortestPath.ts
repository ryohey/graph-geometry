import { INode, NodeId, IGraph } from "./IGraph"

// for Dijkstra
interface DNode extends INode {
  cost: number
  done: boolean
  to: NodeId[]
}

// Dijkstra's algorithm
export function getShortestPath(graph: IGraph, from: NodeId, to: NodeId): IGraph {
  const nodes: DNode[] = graph.nodes.map(n => {
    const toNode = graph.edges.filter(e => e.from === n.id || e.to === n.id).map(e => (e.from === n.id ? e.to : e.from))
    return {
      ...n,
      done: false,
      cost: n.id === from ? 0 : -1, // スタートノードのコストは0
      to: toNode
    }
  })
  while (true) {
    // 確定ノードを探す
    let doneNode: DNode | undefined
    for (const node of nodes) {
      if (node.done || node.cost < 0) {
        continue
      }
      if (doneNode === undefined || node.cost < doneNode.cost) {
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
      const cost = doneNode.cost + 1 // 各エッジの重みは全て 1
      if (nodes[toNode].cost < 0 || cost < nodes[toNode].cost) {
        nodes[toNode].cost = cost
      }
    }
  }
  return {
    nodes: [],
    edges: []
  }
}
