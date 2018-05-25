import { getUID } from "./UID"
import { INode } from "./IGraph"

export function createNode(): INode {
  return {
    id: getUID()
  }
}
