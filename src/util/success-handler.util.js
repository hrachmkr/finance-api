const HTTP_CODE_CONSTANTS = {
  SUCCESS_200: { STATUS: 200, MESSAGE: 'OK' },
  SUCCESS_201: { STATUS: 201, MESSAGE: 'Created' },
  SUCCESS_204: { STATUS: 204 },
}

const _sendResponse = (res, code, data) => {
  if (code.STATUS === 204) {
    return res.status(code.STATUS).json()
  }

  const response = {
    status: code.STATUS,
    message: code.MESSAGE,
    data,
  }

  res.status(response.status).json(response)
}

const handleRedirect = (res, link) => {
  res.redirect(link)
}

const handleList = (res, result) => {
  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_200, result || [])
}

const handleGet = (res, result) => {
  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_200, result || null)
}

const handleAdd = (res, result) => {
  if (!result) {
    return _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_204)
  }

  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_201, result)
}

const handleUpdate = (res, result) => {
  if (!result) {
    return _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_204)
  }

  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_200, result)
}

const handleDelete = (res, result) => {
  if (!result) {
    return _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_204)
  }

  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_200, result)
}

const handleBulkUpdate = (res, result) => {
  if (!result) {
    return _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_204)
  }

  _sendResponse(res, HTTP_CODE_CONSTANTS.SUCCESS_200, result)
}

export {
  handleRedirect,
  handleList,
  handleGet,
  handleAdd,
  handleUpdate,
  handleDelete,
  handleBulkUpdate,
}
