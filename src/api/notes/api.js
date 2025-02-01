import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import {
  getNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} from './service/index.js'

import GlobalValidation from '../../middleware/validation/global.validation.js'

import { CheckIsUserMember } from '../../middleware/member-check.js'

const router = express.Router()

router.get('/', CheckAuthorization, CheckIsUserMember, getNotes)
router.get('/:id', CheckAuthorization, CheckIsUserMember, getSingleNote)
router.post(
  '/',
  CheckAuthorization,
  CheckIsUserMember,
  GlobalValidation.validateNotesBody,
  createNote,
)
router.patch(
  '/:id',
  CheckAuthorization,
  CheckIsUserMember,
  GlobalValidation.validateNotesBody,
  updateNote,
)
router.delete('/:id', CheckAuthorization, CheckIsUserMember, deleteNote)

export default router
