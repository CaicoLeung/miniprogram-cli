const path = require('path')
/**
 * @param  {string} destination 目的路径
 */
exports.joinCwd = (destination) => {
  return path.join(process.cwd(), destination)
}