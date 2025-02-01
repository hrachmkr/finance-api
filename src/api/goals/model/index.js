import mongoose from 'mongoose'
import GoalsSchema from './schema.js'

const Goals = mongoose.model('Goals', GoalsSchema)

import ErrorsUtil from '../../../util/errors.util.js'

const { NotResourceOwnerError } = ErrorsUtil

export const getGoalsModel = (req, res) => {
  const { ownerId } = req.user

  return Goals.find({ ownerId: ownerId }).then((goals) => {
    if (goals && goals.length) {
      return goals
    }
    return []
  })
}

export const getSingleGoalModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Goals.findOne({ _id: id, ownerId: ownerId }).then((goal) => {
    if (!goal) {
      return Promise.reject(
        new NotResourceOwnerError('Goal not found or you are not the owner.'),
      )
    }
    return goal
  })
}

export const createGoalModel = (req, res) => {
  const { ownerId } = req.user
  const newGoal = { ...req.body, ownerId: ownerId }

  return Goals.create(newGoal).then((goal) => {
    return goal
  })
}

export const updateGoalModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  const updatedGoal = {
    ...req.body,
    ownerId: ownerId,
  }

  return Goals.findOneAndUpdate({ _id: id, ownerId: ownerId }, updatedGoal, {
    new: true,
  }).then((goal) => {
    if (!goal) {
      return Promise.reject(
        new NotResourceOwnerError('Goal not found or you are not the owner.'),
      )
    }
    return goal
  })
}

export const deleteGoalModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Goals.findOneAndDelete({ _id: id, ownerId: ownerId }).then((goal) => {
    if (!goal) {
      return Promise.reject(
        new NotResourceOwnerError('Goal not found or you are not the owner.'),
      )
    }
    return goal
  })
}
