import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import {
  getProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} from './service/index.js'

import { CheckIsUserMember } from '../../middleware/member-check.js'

const router = express.Router()

router.get('/', CheckAuthorization, CheckIsUserMember, getProjects)
router.get('/:id', CheckAuthorization, CheckIsUserMember, getSingleProject)
router.post('/', CheckAuthorization, CheckIsUserMember, createProject)
router.patch('/:id', CheckAuthorization, CheckIsUserMember, updateProject)
router.delete('/:id', CheckAuthorization, CheckIsUserMember, deleteProject)

export default router
