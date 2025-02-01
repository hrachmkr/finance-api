import mongoose from 'mongoose'
import DocumentsSchema from './schema.js'

import ErrorsUtil from '../../../util/errors.util.js'

const { NotResourceOwnerError } = ErrorsUtil

const Documents = mongoose.model('Documents', DocumentsSchema)

export const getDocumentsModel = (req, res) => {
  const { ownerId } = req.user

  return Documents.find({ ownerId: ownerId }).then((documents) => {
    if (documents && documents.length) {
      return documents
    }
    return []
  })
}

export const getSingleDocumentModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Documents.findOne({ _id: id, ownerId: ownerId }).then((document) => {
    if (!document) {
      return Promise.reject(
        new NotResourceOwnerError(
          'Document not found or you are not the owner.',
        ),
      )
    }
    return document
  })
}

export const createDocumentModel = (req, res) => {
  const { ownerId } = req.user
  const { title, content } = req.body

  const newDocument = {
    title,
    content,
    ownerId: ownerId,
  }

  return Documents.create(newDocument).then((document) => {
    return document
  })
}

export const updateDocumentModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params
  const { title, content } = req.body

  const updatedDocument = {
    title,
    content,
    ownerId: ownerId,
  }

  return Documents.findOneAndUpdate(
    { _id: id, ownerId: ownerId },
    updatedDocument,
    { new: true },
  ).then((document) => {
    if (!document) {
      return Promise.reject(
        new NotResourceOwnerError(
          'Document not found or you are not the owner.',
        ),
      )
    }
    return document
  })
}

export const updateDocumentTitleModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params
  const { title } = req.body

  const updatedDocument = {
    title,
    ownerId: ownerId,
  }

  return Documents.findOneAndUpdate(
    { _id: id, ownerId: ownerId },
    updatedDocument,
    { new: true },
  ).then((document) => {
    if (!document) {
      return Promise.reject(
        new NotResourceOwnerError(
          'Document not found or you are not the owner.',
        ),
      )
    }
    return document
  })
}

export const deleteDocumentModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Documents.findOneAndDelete({ _id: id, ownerId: ownerId }).then(
    (document) => {
      if (!document) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Document not found or you are not the owner.',
          ),
        )
      }
      return document
    },
  )
}
