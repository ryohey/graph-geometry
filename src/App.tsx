import * as React from "react"
import vis from "vis"
import _ from "lodash"
import { create2DGridGraph } from "./GraphFactory"
import { getNodesAtHops } from "./GraphHelper"
import Graph from "./Graph"
import Geometry from "./Geometry"
import { getDijkstraDistance } from "./getShortestPath"
const { sortNearestNodes } = Geometry(getDijkstraDistance)
// import { getShortestPath } from "./getShortestPath"
// import { getPathVia } from "./getPathVia"

import "./App.css"

class App extends React.Component {
  componentDidMount() {
    const graph = new Graph(create2DGridGraph(10, 10))

    const centerId = graph.nodes[graph.nodes.length / 2 - 5].id

    const circleNodes = getNodesAtHops(graph, centerId, 3)
    const startId = circleNodes[0]
    const viaIds = _.without(circleNodes, startId)
    const nodes = sortNearestNodes(graph, startId, viaIds, startId)

    // const path = getPathVia(graph, nodes, getShortestPath)
    nodes.forEach((id, n) => graph.nodeLabel(id, `${n}`))
    // path.forEach((id, n) => graph.nodeColor(id, "green").nodeLabel(id, `${n}`))
    
    graph.nodeColor(centerId, "red")
    nodes.forEach(n => graph.nodeColor(n, "yellow"))
    
    const options: vis.Options = {
      nodes: {
        shape: 'dot',
        size: 20,
        font: {
            size: 22,
            color: '#ffffff'
        },
        borderWidth: 2
      },
      layout: {
        improvedLayout: true
      },
      physics: {
        barnesHut: {
          centralGravity: 0,
          springConstant: 0.9,
          damping: 0.1,
          avoidOverlap: 0.3
        },
        stabilization: false,
        maxVelocity: 300,
        minVelocity: 1,
        timestep: 0.6
      }
    }
    const network = new vis.Network(document.querySelector("#graph") as HTMLElement, graph, options)
    console.log(network)
  }

  public render() {
    return (
      <div className="App">
        <div id="graph" />
      </div>
    )
  }
}

export default App
