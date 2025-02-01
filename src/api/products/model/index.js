import mongoose from 'mongoose'
import ProductsSchema from './schema.js'

import ErrorsUtil from '../../../util/errors.util.js'

const { NotResourceOwnerError } = ErrorsUtil

const Products = mongoose.model('Products', ProductsSchema)

export const getProductsModel = (req, res) => {
  const { ownerId } = req.user

  return Products.find({ owner: ownerId })
    .populate('owner', 'name expertise picture username id affiliateUrl')
    .then((products) => {
      if (products && products.length) {
        return products
      }
      return []
    })
}

export const getPublicProductsModel = (req, res) => {
  return Products.find({ isPublic: true })
    .populate('owner', 'name expertise picture username id affiliateUrl')
    .then((products) => {
      if (products && products.length) {
        return products
      }
      return []
    })
}

export const getSingleProductModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Products.findOne({ _id: id, owner: ownerId }).then((product) => {
    if (!product) {
      return Promise.reject(
        new NotResourceOwnerError(
          'Product not found or you are not the owner.',
        ),
      )
    }
    return product
  })
}

export const createProductModel = (req, res) => {
  const { ownerId } = req.user
  const newProduct = { ...req.body, owner: ownerId }

  return Products.create(newProduct).then((product) => {
    return product
  })
}

export const updateProductModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  const updatedProduct = {
    ...req.body,
    owner: ownerId,
  }

  return Products.findOneAndUpdate(
    { _id: id, owner: ownerId },
    updatedProduct,
    {
      new: true,
    },
  ).then((product) => {
    if (!product) {
      return Promise.reject(
        new NotResourceOwnerError(
          'Product not found or you are not the owner.',
        ),
      )
    }
    return product
  })
}

export const upvoteProductModel = async (req, res) => {
  const { productId } = req.body
  const { ownerId: userId } = req.user

  const currentUpvotes = await Products.findOne({ _id: productId }).then(
    (product) => {
      if (!product) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Product not found or you are not the owner.',
          ),
        )
      }
      return product.upvotes
    },
  )

  if (currentUpvotes.includes(userId)) {
    return Promise.reject(
      new NotResourceOwnerError('You already upvoted this product.'),
    )
  } else {
    return Products.findOneAndUpdate(
      { _id: productId },
      { $addToSet: { upvotes: userId } },
      { new: true },
    ).then((product) => {
      if (!product) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Product not found or you are not the owner.',
          ),
        )
      }
      return product
    })
  }
}

export const downVoteProductModel = async (req, res) => {
  const { productId } = req.body
  const { ownerId: userId } = req.user

  const currentUpvotes = await Products.findOne({ _id: productId }).then(
    (product) => {
      if (!product) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Product not found or you are not the owner.',
          ),
        )
      }
      return product.upvotes
    },
  )

  if (!currentUpvotes.includes(userId)) {
    return Promise.reject(
      new NotResourceOwnerError('You have not upvoted this product yet.'),
    )
  } else {
    return Products.findOneAndUpdate(
      { _id: productId },
      { $pull: { upvotes: userId } },
      { new: true },
    ).then((product) => {
      if (!product) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Product not found or you are not the owner.',
          ),
        )
      }
      return product
    })
  }
}

export const deleteProductModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Products.findOneAndDelete({ _id: id, owner: ownerId }).then(
    (product) => {
      if (!product) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Product not found or you are not the owner.',
          ),
        )
      }
      return product
    },
  )
}

export const getPublicProductsWithHalfContentModel = (req, res) => {
  return Products.find({ isPublic: true })
    .select(
      'name description category state demoLink tags isPublic logo isFeatured upvotes habitStrike images owner createdAt updatedAt',
    )
    .populate('owner', 'name expertise picture username id affiliateUrl')
    .sort({ upvotes: -1 })
    .then((products) => {
      if (products && products.length) {
        return products
      }
      return []
    })
}

export const getSingleProductWithHalfContentModel = (req, res) => {
  const { id } = req.params

  return Products.findOne({ _id: id, isPublic: true })
    .select(
      'name description category state demoLink tags isPublic logo isFeatured upvotes habitStrike images owner createdAt updatedAt',
    )
    .populate('owner', 'name expertise picture username id affiliateUrl')
    .then((product) => {
      if (!product) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Product not found or you are not the owner.',
          ),
        )
      }
      return product
    })
}
