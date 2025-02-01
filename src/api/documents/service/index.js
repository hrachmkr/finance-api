import {
  getDocumentsModel,
  createDocumentModel,
  updateDocumentModel,
  deleteDocumentModel,
  updateDocumentTitleModel,
} from '../model/index.js'

import {
  handleList,
  handleGet,
  handleAdd,
  handleUpdate,
  handleDelete,
} from '../../../util/success-handler.util.js'

export const getDocuments = async (request, response, next) => {
  try {
    const documents = await getDocumentsModel(request, response)
    return handleList(response, documents)
  } catch (error) {
    next(error)
  }
}

export const getSingleDocument = async (request, response, next) => {
  try {
    const document = await getSingleDocumentModel(request, response)
    return handleGet(response, document)
  } catch (error) {
    next(error)
  }
}

export const createDocument = async (request, response, next) => {
  try {
    const document = await createDocumentModel(request, response)
    return handleAdd(response, document)
  } catch (error) {
    next(error)
  }
}

export const updateDocument = async (request, response, next) => {
  try {
    const document = await updateDocumentModel(request, response)
    return handleUpdate(response, document)
  } catch (error) {
    next(error)
  }
}

export const updateDocumentTitle = async (request, response, next) => {
  try {
    const document = await updateDocumentTitleModel(request, response)
    return handleUpdate(response, document)
  } catch (error) {
    next(error)
  }
}

export const deleteDocument = async (request, response, next) => {
  try {
    const document = await deleteDocumentModel(request, response)
    return handleDelete(response, document)
  } catch (error) {
    next(error)
  }
}
