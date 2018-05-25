import * as React from "react"
import vis from "vis"
import { create2DGridGraph } from "./GraphFactory"

class App extends React.Component {
  componentDidMount() {
    const graph = create2DGridGraph(10, 10)

    graph.getNodesAtHops(graph.nodes[22].id, 1).forEach(n => graph.nodeColor(n, "gray"))

    graph.getNodesAtHops(graph.nodes[22].id, 2).forEach(n => graph.nodeColor(n, "blue"))

    graph.getNodesAtHops(graph.nodes[22].id, 3).forEach(n => graph.nodeColor(n, "green"))

    graph.getNodesAtHops(graph.nodes[22].id, 4).forEach(n => graph.nodeColor(n, "yellow"))

    graph.getNodesAtHops(graph.nodes[22].id, 5).forEach(n => graph.nodeColor(n, "red"))

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
        stabilization: false
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
