import http from 'http'
import { HttpStatusCodesUtil } from '../util/http-status-codes.util.js' // Adjust the path as necessary

export const ERROR_CASES = {
  SyntaxError: {
    // body-parser
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST],
  },
  11000: {
    // mongodb, code is used
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST],
    message: 'Duplicate entry.',
  },
  ResourceNotFoundError: {
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND],
  },
  DEFAULT: {
    statusCode: 500,
    errorCode: 'InternalError',
    errorMessage: 'The server encountered an internal error. Try again later.',
  },
  MulterUnexpectedFieldError: {
    statusCode: 400,
    errorCode: 'InvalidInput',
  },
  ValidationError: {
    statusCode: 400,
    errorCode: 'InvalidInput',
  },
  AIError: {
    statusCode: 400,
    errorCode: 'AIError',
  },
  MediaUploadError: {
    statusCode: 400,
    errorCode: 'MediaUploadError',
  },
  NotFoundError: {
    statusCode: 404,
    errorCode: 'NotFound',
  },
  NotResourceOwnerError: {
    statusCode: 403,
    errorCode: 'Forbidden',
  },
  NotAuthenticatedError: {
    statusCode: 401,
    errorCode: 'Unauthorized',
  },
}

export const errorHandlerMiddleware = (error, req, res, next) => {
  const ERROR_CASE = ERROR_CASES[error.name] || ERROR_CASES.DEFAULT

  const errorResponse = {
    status: ERROR_CASE.statusCode,
    code: ERROR_CASE.errorCode,
    message: ERROR_CASE.errorMessage || error.message,
  }

  // temp. log to explore and add more cases.
  errorResponse.status === 500 && console.log('Error: ', error)

  if (errorResponse.status === 503) {
    res.setHeader('Retry-After', 2 * 60 * 60)
  }

  if (!res.headersSent) {
    res.status(errorResponse.status).json(errorResponse)
    if (errorResponse.status < 500) {
      return res.end()
    }
  }

  next(error)
}
