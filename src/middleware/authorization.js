import admin from 'firebase-admin'

import { getUserIdModel } from '../api/users/model/index.js'

import ErrorsUtil from '../util/errors.util.js'

const { NotAuthenticatedError } = ErrorsUtil

export const CheckAuthorization = (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1]

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      req.user = decodedToken
      const _ownerId = await getUserIdModel(req, res)

      if (_ownerId) {
        req.user.ownerId = _ownerId
      }
      next()
    })
    .catch((error) => {
      return next(new NotAuthenticatedError('Not authenticated. Please login.'))
    })
}
