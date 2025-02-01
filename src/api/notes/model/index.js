import mongoose from 'mongoose'
import NotesSchema from './schema.js'

import ErrorsUtil from '../../../util/errors.util.js'

const { NotResourceOwnerError } = ErrorsUtil

const Notes = mongoose.model('Notes', NotesSchema)

export const getNotesModel = (req, res) => {
  const { ownerId } = req.user

  return Notes.find({ ownerId: ownerId }).then((notes) => {
    if (notes && notes.length) {
      return notes
    }
    return []
  })
}

export const getSingleNoteModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Notes.findOne({ _id: id, ownerId: ownerId }).then((note) => {
    if (!note) {
      return Promise.reject(
        new NotResourceOwnerError('Note not found or you are not the owner.'),
      )
    }
    return note
  })
}

export const createNoteModel = (req, res) => {
  const { ownerId } = req.user
  const { date, content } = req.body

  const newNote = {
    date,
    content,
    ownerId: ownerId,
  }

  return Notes.create(newNote).then((note) => {
    return note
  })
}

export const updateNoteModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params
  const { date, content } = req.body

  const updatedNote = {
    date,
    content,
    ownerId: ownerId,
  }

  return Notes.findOneAndUpdate({ _id: id, ownerId: ownerId }, updatedNote, {
    new: true,
  }).then((note) => {
    if (!note) {
      return Promise.reject(
        new NotResourceOwnerError('Note not found or you are not the owner.'),
      )
    }
    return note
  })
}

export const deleteNoteModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Notes.findOneAndDelete({ _id: id, ownerId: ownerId }).then((note) => {
    if (!note) {
      return Promise.reject(
        new NotResourceOwnerError('Note not found or you are not the owner.'),
      )
    }
    return note
  })
}
