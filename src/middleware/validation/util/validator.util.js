import ValidationHandlerUtil from '../../../util/validation-handler.util.js'

class ValidatorUtil {
  /**
   * @param {Object} value
   * @param {Joi.ObjectSchema} schema
   * @param {Function} next
   * @return {*}
   * @description Validate input with given schema.
   */
  static validate(value, schema, next) {
    const { error } = schema.validate(value, {
      abortEarly: true,
      allowUnknown: false,
      convert: true,
    })

    if (error) {
      return ValidationHandlerUtil.handleResults(error, next)
    }
    return next()
  }
}

export default ValidatorUtil
