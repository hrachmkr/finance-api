import ErrorsUtil from '../util/errors.util.js'

import { getUserIsMemberModel } from '../api/users/model/index.js'

const { NotAuthenticatedError } = ErrorsUtil

export const CheckIsUserMember = async (req, res, next) => {
  const isMember = await getUserIsMemberModel(req, res)
  if (isMember) {
    return next()
  }
  return next(
    new NotAuthenticatedError(
      'You are not a member. Please subscribe to access this feature.',
    ),
  )
}
