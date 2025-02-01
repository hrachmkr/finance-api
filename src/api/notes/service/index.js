import {
  getNotesModel,
  createNoteModel,
  updateNoteModel,
  deleteNoteModel,
} from '../model/index.js'

import {
  handleList,
  handleGet,
  handleAdd,
  handleUpdate,
  handleDelete,
} from '../../../util/success-handler.util.js'

export const getNotes = async (request, response, next) => {
  try {
    const notes = await getNotesModel(request, response)
    return handleList(response, notes)
  } catch (error) {
    next(error)
  }
}

export const getSingleNote = async (request, response, next) => {
  try {
    const note = await getSingleNoteModel(request, response)
    return handleGet(response, note)
  } catch (error) {
    next(error)
  }
}

export const createNote = async (request, response, next) => {
  try {
    const note = await createNoteModel(request, response)
    return handleAdd(response, note)
  } catch (error) {
    next(error)
  }
}

export const updateNote = async (request, response, next) => {
  try {
    const note = await updateNoteModel(request, response)
    return handleUpdate(response, note)
  } catch (error) {
    next(error)
  }
}

export const deleteNote = async (request, response, next) => {
  try {
    const note = await deleteNoteModel(request, response)
    return handleDelete(response, note)
  } catch (error) {
    next(error)
  }
}
