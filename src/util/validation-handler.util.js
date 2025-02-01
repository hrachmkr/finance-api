import ErrorsUtil from './errors.util.js'

const { ValidationError } = ErrorsUtil

class ValidationHandlerUtil {
  /**
   * @param {Object} error
   * @param {Function} next
   * @description Validation results handler.
   */
  static handleResults(error, next) {
    if (error) {
      const errorMessage =
        error && error.details && error.details[0] && error.details[0].message
      return next(new ValidationError(errorMessage))
    }

    return next()
  }
}

export default ValidationHandlerUtil
