import {
  getUserModel,
  updateUserModel,
  createCustomTokenModel,
  updateAffLinkModel,
  updateUserSubscriptionModel,
  getFoundersModel,
  getPublicFoundersModel,
} from '../model/index.js'

import {
  handleGet,
  handleAdd,
  handleList,
} from '../../../util/success-handler.util.js'

export const getCurrentUser = async (request, response, next) => {
  try {
    const user = await getUserModel(request, response, next)
    return handleGet(response, user)
  } catch (error) {
    next(error)
  }
}

export const getFounders = async (request, response, next) => {
  try {
    const founders = await getFoundersModel(request, response, next)
    return handleList(response, founders)
  } catch (error) {
    next(error)
  }
}

export const getPublicFounders = async (request, response, next) => {
  try {
    const founders = await getPublicFoundersModel(request, response, next)
    return handleList(response, founders)
  } catch (error) {
    next(error)
  }
}

export const updateCurrentUser = async (request, response, next) => {
  try {
    const user = await updateUserModel(request, response, next)
    return handleGet(response, user)
  } catch (error) {
    next(error)
  }
}

export const updateAffLink = async (request, response, next) => {
  try {
    const user = await updateAffLinkModel(request, response, next)
    return handleGet(response, user)
  } catch (error) {
    next(error)
  }
}

export const createCustomToken = async (request, response, next) => {
  try {
    const token = await createCustomTokenModel(request, response, next)
    return handleAdd(response, token)
  } catch (error) {
    next(error)
  }
}

export const updateCurrentUserSubscription = async (
  request,
  response,
  next,
) => {
  try {
    const user = await updateUserSubscriptionModel(request, response, next)
    return handleGet(response, user)
  } catch (error) {
    next(error)
  }
}
