export type UID = number

let lastUID = Date.now()
export function getUID(): UID {
  return ++lastUID
}
