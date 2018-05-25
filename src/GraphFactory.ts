import { assemble1DGraphs } from "./GraphHelper"
import { IGraph, INode, IEdge } from "./IGraph"
import { overlappedChunk } from "./ArrayHelper"
import _ from "lodash"
import Graph from "./Graph"
import { createNode } from "./NodeFactory"

export function createLineGraph(length: number): IGraph {
  const nodes: INode[] = _.range(0, length).map(createNode)
  const edges = overlappedChunk(nodes).map(
    c =>
      ({
        from: c[0].id,
        to: c[1].id
      } as IEdge)
  )
  return {
    nodes,
    edges
  }
}

export function createRingGraph(length: number): IGraph {
  const graph = createLineGraph(length)
  // 最初と最後を繋ぐ
  graph.edges.push({
    from: graph.nodes[graph.nodes.length - 1].id,
    to: graph.nodes[0].id
  })
  return graph
}

export function create2DGridGraph(width: number, height: number) {
  const rings = _.range(0, height).map(() => createLineGraph(width))
  return assemble1DGraphs(...rings)
}

export function exampleGraph() {
  const graph = new Graph()
    .createNode(1)
    .createNode(2)
    .createNode(3)
    .createNode(4)
    .createNode(5)
    .createNode(6)
    .createNode(7)
    .createNode(8)
    .createNode(9)
    .createEdge(1, 2)
    .createEdge(1, 3)
    .createEdge(1, 4)
    .createEdge(1, 5)
    .createEdge(2, 6)
    .createEdge(6, 7)
    .createEdge(7, 8)
    .createEdge(8, 9)
    .nodeColor(1, "green")

  return graph
}
