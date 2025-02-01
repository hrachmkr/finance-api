const Joi = require('joi')

class UsersSchema {}

/**
 * @description Validation schema for add user.
 */
UsersSchema.addUserSchema = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .max(50)
      .required(),
    username: Joi.string()
      .max(50)
      .required(),
    password: Joi.string()
      .min(4)
      .max(20)
      .required()
  }).required()
}

/**
 * @description Validation schema for get user.
 */
UsersSchema.getUserSchema = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .max(50)
      .required(),
    password: Joi.string()
      .min(4)
      .max(20)
      .required()
  }).required()
}

module.exports = UsersSchema
