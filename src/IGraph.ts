export type NodeId = number

export interface INode {
	id: NodeId
}

export interface IEdge {
	from: NodeId
  to: NodeId
}

export interface IGraph {
	nodes: INode[]
  edges: IEdge[]
}
