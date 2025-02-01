import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import { uploadMultipleFiles } from '../../middleware/upload.js'
import { getMediaFiles, uploadMediaFiles } from './service/index.js'

import { CheckIsUserMember } from '../../middleware/member-check.js'

const router = express.Router()

router.get('/', CheckAuthorization, CheckIsUserMember, getMediaFiles)

router.post(
  '/upload',
  CheckAuthorization,
  CheckIsUserMember,
  uploadMultipleFiles,
  uploadMediaFiles,
)

export default router
