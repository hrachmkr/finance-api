import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import { generateAiText, generateAiTextFromImage } from './service/index.js'

import { CheckIsUserMember } from '../../middleware/member-check.js'

const router = express.Router()

router.post(
  '/generate-text',
  CheckAuthorization,
  CheckIsUserMember,
  generateAiText,
)

router.post(
  '/generate-text-from-image',
  CheckAuthorization,
  CheckIsUserMember,
  generateAiTextFromImage,
)

export default router
