import {
  getProductsModel,
  getPublicProductsModel,
  getSingleProductModel,
  createProductModel,
  updateProductModel,
  deleteProductModel,
  upvoteProductModel,
  downVoteProductModel,
  getPublicProductsWithHalfContentModel,
  getSingleProductWithHalfContentModel,
} from '../model/index.js'

import {
  handleList,
  handleGet,
  handleAdd,
  handleUpdate,
  handleDelete,
} from '../../../util/success-handler.util.js'

export const getProducts = async (request, response, next) => {
  try {
    const products = await getProductsModel(request, response)
    return handleList(response, products)
  } catch (error) {
    next(error)
  }
}

export const getPublicProducts = async (request, response, next) => {
  try {
    const products = await getPublicProductsModel(request, response)
    return handleList(response, products)
  } catch (error) {
    next(error)
  }
}

export const getSingleProduct = async (request, response, next) => {
  try {
    const product = await getSingleProductModel(request, response)
    return handleGet(response, product)
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (request, response, next) => {
  try {
    const product = await createProductModel(request, response)
    return handleAdd(response, product)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (request, response, next) => {
  try {
    const product = await updateProductModel(request, response)
    return handleUpdate(response, product)
  } catch (error) {
    next(error)
  }
}

export const upvoteProduct = async (request, response, next) => {
  try {
    const product = await upvoteProductModel(request, response)
    return handleUpdate(response, product)
  } catch (error) {
    next(error)
  }
}

export const downVoteProduct = async (request, response, next) => {
  try {
    const product = await downVoteProductModel(request, response)
    return handleUpdate(response, product)
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (request, response, next) => {
  try {
    const product = await deleteProductModel(request, response)
    return handleDelete(response, product)
  } catch (error) {
    next(error)
  }
}

export const getPublicProductsWithHalfContent = async (
  request,
  response,
  next,
) => {
  try {
    const products = await getPublicProductsWithHalfContentModel(
      request,
      response,
    )
    return handleList(response, products)
  } catch (error) {
    next(error)
  }
}

export const getSinglePublicProductWithHalfContent = async (
  request,
  response,
  next,
) => {
  try {
    const product = await getSingleProductWithHalfContentModel(
      request,
      response,
    )
    return handleGet(response, product)
  } catch (error) {
    next(error)
  }
}
