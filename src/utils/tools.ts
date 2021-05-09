const MAX_SAFE_INTEGER = 9007199254740991

export const isLength = (value: unknown) => {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
}

export const isArrayLike = (value: unknown): value is ArrayLike<unknown> => {
  return value !== null && typeof value !== 'function' && isLength((value as { length: unknown }).length)
}

export const taskFirst = <T>(list: T[], defaultValue: T): T => {
  if (isArrayLike(list) && list.length) {
    return list[0]
  }
  return defaultValue
}