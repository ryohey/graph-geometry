import { INode, IEdge, IGraph, NodeId } from "./IGraph"
import _ from "lodash"

export default class Graph implements IGraph {
  nodes: INode[] = []
  edges: IEdge[] = []

  constructor(graph?: IGraph) {
    if (graph !== undefined) {
      this.nodes = graph.nodes
      this.edges = graph.edges
    }
  }

  getEdgesWithNode(id: NodeId): IEdge[] {
    return this.edges.filter(e => e.from === id || e.to === id)
  }

  getNeighborNodes(id: NodeId): NodeId[] {
    return this.getEdgesWithNode(id).map(e => {
      return e.from === id ? e.to : e.from
    })
  }

  getNodesAtHops(from: NodeId, hops: number, memo?: NodeId[]): NodeId[] {
    const mem: NodeId[] = memo === undefined ? [from] : memo
    const neighbors = this.getNeighborNodes(from).filter(n => !mem.includes(n))
    neighbors.forEach(n => mem.push(n))
    const nextHops = hops - 1
    if (nextHops === 0) {
      return neighbors
    } else {
      return _.flatten(neighbors.map(n => this.getNodesAtHops(n, nextHops, mem)))
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

  static merge(...graphs: IGraph[]): Graph {
    function merge2(graphA: Graph, graphB: Graph): IGraph {
      return {
        nodes: [...graphA.nodes, ...graphB.nodes],
        edges: [...graphA.edges, ...graphB.edges]
      }
    }
    const g = graphs.reduce(merge2)
    return new Graph(g)
  }
}
