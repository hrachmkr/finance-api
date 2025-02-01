const ERRORS_NAME = [
  'ValidationError',
  'ResourceNotFoundError',
  'NotResourceOwnerError',
  'NotAuthenticatedError',
  'AIError',
  'InternalError',
  'MediaUploadError',
  'NotFoundError',
]

const ERRORS = ERRORS_NAME.reduce((acc, className) => {
  acc[className] = {
    [className]: class extends Error {
      constructor(msg) {
        super()
        this.message = msg
        this.name = this.constructor.name
      }
    },
  }[className]

  return acc
}, {})

export default ERRORS
