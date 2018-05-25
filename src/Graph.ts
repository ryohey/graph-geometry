import { INode, IEdge, IGraph, NodeId } from "./IGraph"

export default class Graph implements IGraph {
  nodes: INode[] = []
  edges: IEdge[] = []

  constructor(graph?: IGraph) {
    if (graph !== undefined) {
      this.nodes = graph.nodes
      this.edges = graph.edges
    }
  }

  createNode(id: NodeId): Graph {
    this.nodes.push({ id })
    return this
  }

  createEdge(from: NodeId, to: NodeId): Graph {
    this.edges.push({ from, to })
    return this
  }

  updateNode(id: NodeId, obj: any): Graph {
    this.nodes = this.nodes.map(n => {
      return n.id === id ? { ...n, ...obj } : n
    })
    return this
  }

  nodeColor(id: NodeId, color: string = "red"): Graph {
    this.updateNode(id, { color })
    return this
  }
}
