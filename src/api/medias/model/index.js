import mongoose from 'mongoose'
import MediasSchema from './schema.js'

import S3Storage from '../../../libs/s3.js'

import ErrorsUtil from '../../../util/errors.util.js'

const { MediaUploadError } = ErrorsUtil

const Medias = mongoose.model('Medias', MediasSchema)

import { generateS3FilesUploadPayloads } from '../../../util/file-manager.util.js'

export const getMediaFilesModel = (req, res) => {
  const { ownerId } = req.user

  return Medias.find({ ownerId: ownerId }).then((files) => {
    if (files && files.length) {
      return files
    }
    return []
  })
}

export const uploadMediaFilesModel = (req, res, next) => {
  const files = req.files
  const { ownerId } = req.user

  const pathPrefix = req.query.folder || 'images'

  const payloads = generateS3FilesUploadPayloads(
    pathPrefix,
    'storyhex-static',
    files,
  )
  return S3Storage.uploadFilesToS3(payloads)
    .then(() => {
      const files = Object.keys(payloads).map((key) => {
        return {
          mimeType: payloads[key].fileMime,
          filePath: `https://storyhex-static.s3.us-east-2.amazonaws.com/${payloads[key].distFilePath}`,
        }
      })

      const _files = files.map((file) => {
        return {
          ...file,
          ownerId: ownerId,
        }
      })

      return Medias.create([..._files]).then(() => _files)
    })
    .catch((error) => {
      next(new MediaUploadError('Failed to upload media files.'))
    })
}
