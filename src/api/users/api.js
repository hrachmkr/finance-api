import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import { CheckIsUserMember } from '../../middleware/member-check.js'
import {
  getCurrentUser,
  updateCurrentUser,
  createCustomToken,
  updateCurrentUserSubscription,
  updateAffLink,
  getFounders,
  getPublicFounders,
} from './service/index.js'

const router = express.Router()

const rawBodyBuffer = (req, res, next) => {
  let dataChunks = []
  req.on('data', (chunk) => {
    dataChunks.push(chunk)
  })
  req.on('end', () => {
    req.rawBody = Buffer.concat(dataChunks)
    next()
  })
}

router.get('/me', CheckAuthorization, getCurrentUser)
router.get('/founders', getFounders)
router.get('/founders/public', getPublicFounders)

router.patch('/me', CheckAuthorization, updateCurrentUser)

router.patch(
  '/affiliate-link',
  CheckAuthorization,
  CheckIsUserMember,
  updateAffLink,
)

router.post(
  '/subscripition-webhook',
  rawBodyBuffer,
  updateCurrentUserSubscription,
)

router.post('/create-custom-token', createCustomToken)

export default router
