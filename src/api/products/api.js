import express from 'express'
import { CheckAuthorization } from '../../middleware/authorization.js'
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  upvoteProduct,
  downVoteProduct,
  getPublicProducts,
  getPublicProductsWithHalfContent,
  getSinglePublicProductWithHalfContent,
} from './service/index.js'

import { CheckIsUserMember } from '../../middleware/member-check.js'

const router = express.Router()

router.get('/', CheckAuthorization, CheckIsUserMember, getProducts)
router.get('/public', CheckAuthorization, getPublicProducts)
router.get('/public/hidden', getPublicProductsWithHalfContent)
router.get('/:id/public/hidden', getSinglePublicProductWithHalfContent)
router.get('/:id', CheckAuthorization, CheckIsUserMember, getSingleProduct)
router.post('/', CheckAuthorization, CheckIsUserMember, createProduct)
router.patch('/upvote', CheckAuthorization, CheckIsUserMember, upvoteProduct)
router.patch(
  '/downvote',
  CheckAuthorization,
  CheckIsUserMember,
  downVoteProduct,
)
router.patch('/:id', CheckAuthorization, CheckIsUserMember, updateProduct)
router.delete('/:id', CheckAuthorization, CheckIsUserMember, deleteProduct)

export default router
