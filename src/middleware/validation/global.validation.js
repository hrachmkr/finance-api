import Joi from 'joi'

import ValidatorUtil from './util/validator.util.js'

class GlobalValidation {
  static validateDocumentBody(req, res, next) {
    const value = { body: req.body }
    const schema = Joi.object({
      body: {
        title: Joi.string().allow(''),
        content: Joi.string().allow(''),
        ownerId: Joi.string(),
      },
    })

    return ValidatorUtil.validate(value, schema, next)
  }
  static validateGoalsBody(req, res, next) {
    const value = { body: req.body }
    const schema = Joi.object({
      body: {
        id: Joi.string(),
        title: Joi.string().allow(''),
        description: Joi.string().allow(''),
        frequency: Joi.number(),
        startDate: Joi.string(),
        dueDateCount: Joi.number(),
        checkedState: Joi.array().items(Joi.number()),
        ownerId: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
      },
    })

    return ValidatorUtil.validate(value, schema, next)
  }
  static validateNotesBody(req, res, next) {
    const value = { body: req.body }
    const schema = Joi.object({
      body: {
        date: Joi.string(),
        content: Joi.string(),
        ownerId: Joi.string(),
      },
    })

    return ValidatorUtil.validate(value, schema, next)
  }
  static validateStoryBody(req, res, next) {
    const value = { body: req.body }
    const schema = Joi.object({
      body: {
        id: Joi.string(),
        title: Joi.string().allow(''),
        storyImage: Joi.string(),
        content: Joi.string().allow(''),
        categories: Joi.array().items(Joi.string()),
        published: Joi.boolean(),
        hexColor: Joi.string().allow(''),
        owner: Joi.object(),
        product: Joi.string().allow(''),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
      },
    })

    return ValidatorUtil.validate(value, schema, next)
  }
}

export default GlobalValidation
