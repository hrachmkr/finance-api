const { UsersSchema } = require('./schema')

const ValidatorUtil = require('./util/validator.util')

class UsersValidation {
  /**
   * @description Validate arguments for add user.
   */
  static validateAddUserArgs(request, response, next) {
    const args = { body: request.body }

    ValidatorUtil.validate(args, UsersSchema.addUserSchema, next)
  }

  /**
   * @description Validate arguments for add user.
   */
  static validateGetUserArgs(request, response, next) {
    const args = { body: request.body }

    ValidatorUtil.validate(args, UsersSchema.getUserSchema, next)
  }
}

module.exports = UsersValidation
