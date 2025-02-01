import {
  generateAiTextModel,
  generateTextFromImageModel,
} from '../model/index.js'

import { handleAdd } from '../../../util/success-handler.util.js'

export const generateAiText = async (request, response, next) => {
  try {
    const textData = await generateAiTextModel(request, response)
    return handleAdd(response, textData)
  } catch (error) {
    next(error)
  }
}

export const generateAiTextFromImage = async (request, response, next) => {
  try {
    const data = await generateTextFromImageModel(request, response)
    return handleAdd(response, data)
  } catch (error) {
    next(error)
  }
}
