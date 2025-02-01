import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import {
  getDocuments,
  getSingleDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  updateDocumentTitle,
} from './service/index.js'

import GlobalValidation from '../../middleware/validation/global.validation.js'

import { CheckIsUserMember } from '../../middleware/member-check.js'

const router = express.Router()

router.get('/', CheckAuthorization, CheckIsUserMember, getDocuments)
router.get('/:id', CheckAuthorization, CheckIsUserMember, getSingleDocument)
router.post(
  '/',
  CheckAuthorization,
  CheckIsUserMember,
  GlobalValidation.validateDocumentBody,
  createDocument,
)
router.patch(
  '/:id',
  CheckAuthorization,
  CheckIsUserMember,
  GlobalValidation.validateDocumentBody,
  updateDocument,
)
router.patch(
  '/:id/title',
  CheckAuthorization,
  CheckIsUserMember,
  updateDocumentTitle,
)
router.delete('/:id', CheckAuthorization, CheckIsUserMember, deleteDocument)

export default router
