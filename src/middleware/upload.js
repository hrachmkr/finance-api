import multer from 'multer'
// import { ValidationError } from '../util/errors.util'

// const ValidationError = {
//   statusCode: 400,
//   errorCode: 'InvalidInput',
// }

const MulterUnexpectedFieldError = {
  statusCode: 400,
  errorCode: 'InvalidInput',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files-tmp/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  const fileFieldName = file.fieldname
  const fileMimeType = file.mimetype

  const validMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    // 'video/mp4'
  ]

  if (validMimeTypes.includes(fileMimeType)) {
    return cb(null, true)
  }

  // TODO: add error handling
  // const errorMessage = `"${fileFieldName}" mime type is invalid `

  // return cb(new ValidationError(errorMessage))
}

const _upload = (req, res, next, upload) => {
  upload(req, res, (error) => {
    if (error) {
      const _error = error

      return next(_error)
    }

    return next()
  })
}

export const uploadSingleFile = (req, res, next) => {
  const upload = multer({ storage, fileFilter }).single('file')
  _upload(req, res, next, upload)
}

export const uploadMultipleFiles = (req, res, next) => {
  const upload = multer({
    storage,
    fileFilter,
  }).array(['files'], 24)

  _upload(req, res, next, upload)
}
