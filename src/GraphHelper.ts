import { IGraph, IEdge, INode, NodeId } from "./IGraph"
import _ from "lodash"

export function assemble1DGraphs(...graphs: IGraph[]) {
  function assemble2(nodesA: INode[], nodesB: INode[]): IEdge[] {
    if (nodesA.length !== nodesB.length) {
      throw new Error("graphs must have same number of nodes")
    }
    const edges: IEdge[] = []
    for (let i = 0; i < nodesA.length; i++) {
      edges.push({
        from: nodesA[i].id,
        to: nodesB[i].id
      })
    }
    return edges
  }
  let graph = graphs[0]
  for (let i = 0; i < graphs.length - 1; i++) {
    const graphA = graphs[i]
    const graphB = graphs[i + 1]
    graph = merge(graph, graphB)
    const edges = assemble2(graphA.nodes, graphB.nodes)
    graph.edges = [...graph.edges, ...edges]
  }
  return graph
}

export function getEdgesWithNode(graph: IGraph, id: NodeId): IEdge[] {
  return graph.edges.filter(e => e.from === id || e.to === id)
}

export function getNeighborNodes(graph: IGraph, id: NodeId): NodeId[] {
  return getEdgesWithNode(graph, id).map(e => e.from === id ? e.to : e.from)
}

export function getNodesAtHops(graph: IGraph, from: NodeId, hops: number, memo?: NodeId[]): NodeId[] {
  const mem: NodeId[] = memo === undefined ? [from] : memo
  const neighbors = getNeighborNodes(graph, from).filter(n => !mem.includes(n))
  neighbors.forEach(n => mem.push(n))
  const nextHops = hops - 1
  if (nextHops === 0) {
    return neighbors
  } else {
    return _.flatten(neighbors.map(n => getNodesAtHops(graph, n, nextHops, mem)))
  }
}

export function merge(...graphs: IGraph[]): IGraph {
  function merge2(graphA: IGraph, graphB: IGraph): IGraph {
    return {
      nodes: [...graphA.nodes, ...graphB.nodes],
      edges: [...graphA.edges, ...graphB.edges]
    }
  }
  return graphs.reduce(merge2)
}
