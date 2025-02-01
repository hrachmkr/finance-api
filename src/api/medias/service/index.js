import { getMediaFilesModel, uploadMediaFilesModel } from '../model/index.js'

import { handleList } from '../../../util/success-handler.util.js'

export const getMediaFiles = async (request, response, next) => {
  try {
    const files = await getMediaFilesModel(request, response)
    return handleList(response, files)
  } catch (error) {
    next(error)
  }
}

export const uploadMediaFiles = async (request, response, next) => {
  try {
    const files = await uploadMediaFilesModel(request, response)
    return handleList(response, files)
  } catch (error) {
    next(error)
  }
}
