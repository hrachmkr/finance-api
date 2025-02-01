import {
  getStoriesModel,
  createStoryModel,
  updateStoryModel,
  getPublicStoriesModel,
  deleteStoryModel,
  getPublicStoriesWithHalfContentModel,
  getSinglePublicStoryWithHalfContentModel,
  getPublicStoriesWithHalfContentByProductIdModel,
} from '../model/index.js'

import {
  handleList,
  handleGet,
  handleAdd,
  handleUpdate,
  handleDelete,
} from '../../../util/success-handler.util.js'

export const getStories = async (request, response, next) => {
  try {
    const stories = await getStoriesModel(request, response)
    return handleList(response, stories)
  } catch (error) {
    next(error)
  }
}

export const getPublicStories = async (request, response, next) => {
  try {
    const stories = await getPublicStoriesModel(request, response)
    return handleList(response, stories)
  } catch (error) {
    next(error)
  }
}

export const getPublicStoriesWithHalfContent = async (
  request,
  response,
  next,
) => {
  try {
    const stories = await getPublicStoriesWithHalfContentModel(
      request,
      response,
    )
    return handleList(response, stories)
  } catch (error) {
    next(error)
  }
}

export const getPublicStoriesWithHalfContentByProductId = async (
  request,
  response,
  next,
) => {
  try {
    const stories = await getPublicStoriesWithHalfContentByProductIdModel(
      request,
      response,
    )
    return handleList(response, stories)
  } catch (error) {
    next(error)
  }
}

export const getSingleStoryWihtHalfContent = async (
  request,
  response,
  next,
) => {
  try {
    const story = await getSinglePublicStoryWithHalfContentModel(
      request,
      response,
    )
    return handleGet(response, story)
  } catch (error) {
    next(error)
  }
}

export const getSingleStory = async (request, response, next) => {
  try {
    const story = await getSingleStoryModel(request, response)
    return handleGet(response, story)
  } catch (error) {
    next(error)
  }
}

export const createStory = async (request, response, next) => {
  try {
    const story = await createStoryModel(request, response)
    return handleAdd(response, story)
  } catch (error) {
    next(error)
  }
}

export const updateStory = async (request, response, next) => {
  try {
    const story = await updateStoryModel(request, response)
    return handleUpdate(response, story)
  } catch (error) {
    next(error)
  }
}

export const deleteStory = async (request, response, next) => {
  try {
    const story = await deleteStoryModel(request, response)
    return handleDelete(response, story)
  } catch (error) {
    next(error)
  }
}
