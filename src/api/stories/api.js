import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import {
  getStories,
  getSingleStory,
  createStory,
  updateStory,
  deleteStory,
  getPublicStories,
  getPublicStoriesWithHalfContent,
  getSingleStoryWihtHalfContent,
  getPublicStoriesWithHalfContentByProductId,
} from './service/index.js'

import GlobalValidation from '../../middleware/validation/global.validation.js'

import { CheckIsUserMember } from '../../middleware/member-check.js'

const router = express.Router()

router.get('/', CheckAuthorization, CheckIsUserMember, getStories)
router.get('/public', CheckAuthorization, getPublicStories)
router.get('/public/hidden', getPublicStoriesWithHalfContent)
router.get(
  '/public/hidden/:productId',
  getPublicStoriesWithHalfContentByProductId,
)
router.get('/:id', CheckAuthorization, CheckIsUserMember, getSingleStory)
router.get('/:id/public/hidden', getSingleStoryWihtHalfContent)
router.post(
  '/',
  CheckAuthorization,
  CheckIsUserMember,
  GlobalValidation.validateStoryBody,
  createStory,
)
router.patch(
  '/:id',
  CheckAuthorization,
  CheckIsUserMember,
  GlobalValidation.validateStoryBody,
  updateStory,
)
router.delete('/:id', CheckAuthorization, CheckIsUserMember, deleteStory)

export default router
