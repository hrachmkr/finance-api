import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import {
  getGoals,
  getSingleGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from './service/index.js'

import GlobalValidation from '../../middleware/validation/global.validation.js'
import { CheckIsUserMember } from '../../middleware/member-check.js'

const router = express.Router()

router.get('/', CheckAuthorization, CheckIsUserMember, getGoals)
router.get('/:id', CheckAuthorization, CheckIsUserMember, getSingleGoal)
router.post(
  '/',
  CheckAuthorization,
  CheckIsUserMember,
  GlobalValidation.validateGoalsBody,
  createGoal,
)
router.patch(
  '/:id',
  CheckAuthorization,
  CheckIsUserMember,
  GlobalValidation.validateGoalsBody,
  updateGoal,
)
router.delete('/:id', CheckAuthorization, CheckIsUserMember, deleteGoal)

export default router
