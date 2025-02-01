import {
  getGoalsModel,
  getSingleGoalModel,
  createGoalModel,
  updateGoalModel,
  deleteGoalModel,
} from '../model/index.js'

import {
  handleList,
  handleGet,
  handleAdd,
  handleUpdate,
  handleDelete,
} from '../../../util/success-handler.util.js'

export const getGoals = async (request, response, next) => {
  try {
    const goals = await getGoalsModel(request, response)
    return handleList(response, goals)
  } catch (error) {
    next(error)
  }
}

export const getSingleGoal = async (request, response, next) => {
  try {
    const goal = await getSingleGoalModel(request, response)
    return handleGet(response, goal)
  } catch (error) {
    next(error)
  }
}

export const createGoal = async (request, response, next) => {
  try {
    const goal = await createGoalModel(request, response)
    return handleAdd(response, goal)
  } catch (error) {
    next(error)
  }
}

export const updateGoal = async (request, response, next) => {
  try {
    const goal = await updateGoalModel(request, response)
    return handleUpdate(response, goal)
  } catch (error) {
    next(error)
  }
}

export const deleteGoal = async (request, response, next) => {
  try {
    const goal = await deleteGoalModel(request, response)
    return handleDelete(response, goal)
  } catch (error) {
    next(error)
  }
}
