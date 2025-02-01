import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import Promise from 'bluebird'
import fsExtra from 'fs-extra'

const generateFileDestinationPath = (payload) => {
  const { pathPrefix, originalName, encoding, mimeType, size } = payload

  const fileExtension = mimeType.split('/')[1]
  const stringToHash = `${originalName}${encoding}${mimeType}${size}`
  const md5Hash = crypto.createHash('md5').update(stringToHash).digest('hex')

  return `${pathPrefix}/${md5Hash}.${fileExtension}`
}

const generateS3FileUploadPayload = (pathPrefix, bucketName, file) => {
  const { originalname, encoding, mimetype, path, size } = file

  return {
    fileStream: fs.createReadStream(path),
    fileMime: mimetype,
    distFilePath: generateFileDestinationPath({
      pathPrefix,
      originalName: originalname,
      encoding,
      mimeType: mimetype,
      size,
    }),
    bucketName,
  }
}

export const generateS3FilesUploadPayloads = (
  pathPrefix,
  bucketName,
  files,
) => {
  return Object.keys(files).reduce((acc, currentKey) => {
    const file = files[currentKey]
    acc[currentKey] = generateS3FileUploadPayload(pathPrefix, bucketName, file)

    return acc
  }, {})
}

const generateS3PdfUploadPayload = (bucketName, fileContent, distFilePath) => {
  return {
    fileStream: fileContent,
    fileMime: 'application/pdf',
    distFilePath,
    bucketName,
  }
}

const generateS3FileDeletePayload = (distFilePath, bucketName) => {
  return { distFilePath, bucketName }
}

export const generateS3FilesDeletePayloads = (distFilePaths, bucketName) => {
  return Object.keys(distFilePaths).reduce((acc, currentKey) => {
    const distFilePath = distFilePaths[currentKey]

    if (distFilePath) {
      acc[currentKey] = generateS3FileDeletePayload(distFilePath, bucketName)
    }

    return acc
  }, {})
}
