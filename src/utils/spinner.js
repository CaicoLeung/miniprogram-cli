const ora = require('ora');

/**
 * @param  {()=>T|Promise<T>} func
 * @param  {{start: String, success: String, failed: String}} textInfo
 */
exports.withSpinner = function (func, textInfo) {
  const spinner = ora(textInfo.start)
  spinner.start()
  /**
   * @param  {T} d
   */
  const setSpinnerSucceed = (d) => (spinner.succeed(textInfo.success), d)
  /**
   * @param  {Error} e
   */
  const setSpinnerFailed = (e) => {
    spinner.fail(e.message ?? textInfo.failed)
    throw e
  }

  let result

  try {
    const r = func()

    if (r instanceof Promise) {
      result = r.then(setSpinnerSucceed, setSpinnerFailed)
    } else {
      result = setSpinnerSucceed(r)
    }
  } catch (e) {
    setSpinnerFailed(e)
  }

  return result
};