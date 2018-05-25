// [1, 2, 3] -> [[1, 2], [2, 3]]
export function overlappedChunk<T>(arr: T[]) {
  const result: T[][] = []
  for (let i = 0; i < arr.length - 1; i++) {
    result.push([arr[i], arr[i + 1]])
  }
  return result
}
