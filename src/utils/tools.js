const MAX_SAFE_INTEGER = 9007199254740991

const isLength = (value) => {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
}
/**
 * @param  {unknown} value
 * @returns valueisArrayLike
 */
const isArrayLike = (value) => {
  return value !== null && typeof value !== 'function' && isLength((value).length)
}
/**
 * @param  {T[]} list
 * @param  {T} defaultValue
 * @returns T
 */
const taskFirst = (list, defaultValue) => {
  if (isArrayLike(list) && list.length) {
    return list[0]
  }
  return defaultValue
}

module.exports = {
  isLength,
  isArrayLike,
  taskFirst
}