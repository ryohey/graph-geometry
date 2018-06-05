import * as React from "react"
import vis from "vis"
import { create2DGridGraph } from "./GraphFactory"
// import { getNodesAtHops } from "./GraphHelper"
import Graph from "./Graph"
import { getShortestPath } from "./getShortestPath"
import { getPathVia } from "./getPathVia"
import _ from "lodash"

import "./App.css"

class App extends React.Component {
  componentDidMount() {
    const graph = new Graph(create2DGridGraph(10, 10))

    const randomId = () => 
      graph.nodes[_.random(0, graph.nodes.length - 1)].id

    const startId = randomId()
    const midId = randomId()
    const goalId = randomId()

    const path = getPathVia(graph, [startId, midId, goalId], getShortestPath)

    path.forEach(id => graph.nodeColor(id, "green"))

    graph.nodeColor(startId, "red")
    graph.nodeColor(midId, "yellow")
    graph.nodeColor(goalId, "red")
    // const centerId = graph.nodes[20 * (20 + 1) / 2].id
    // getNodesAtHops(graph, centerId, 1).forEach(n => graph.nodeColor(n, "gray"))
    // getNodesAtHops(graph, centerId, 2).forEach(n => graph.nodeColor(n, "blue"))
    // getNodesAtHops(graph, centerId, 3).forEach(n => graph.nodeColor(n, "green"))
    // getNodesAtHops(graph, centerId, 4).forEach(n => graph.nodeColor(n, "yellow"))
    // getNodesAtHops(graph, centerId, 5).forEach(n => graph.nodeColor(n, "red"))

    // const graph = assemble1DGraphs(
    //   createLineGraph(13),
    //   createLineGraph(13),
    //   createLineGraph(13),
    //   createLineGraph(13),
    //   createLineGraph(13)
    // )

    const options: vis.Options = {
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
