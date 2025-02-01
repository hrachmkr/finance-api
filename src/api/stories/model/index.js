import mongoose from 'mongoose'
import StoriesSchema from './schema.js'

import ErrorsUtil from '../../../util/errors.util.js'

const { NotResourceOwnerError } = ErrorsUtil

const Stories = mongoose.model('Stories', StoriesSchema)

export const getStoriesModel = (req, res) => {
  const { ownerId } = req.user

  return Stories.find({ owner: ownerId })
    .sort({ createdAt: -1 })
    .populate('owner', 'name expertise picture username id affiliateUrl')
    .populate('product', 'name id logo')
    .then((stories) => {
      if (stories && stories.length) {
        return stories
      }
      return []
    })
}

export const getPublicStoriesModel = (req, res) => {
  return Stories.find({ published: true })
    .sort({ createdAt: -1 })
    .populate('owner', 'name expertise picture username id affiliateUrl')
    .populate('product', 'name id logo')
    .then((stories) => {
      if (stories && stories.length) {
        return stories
      }
      return []
    })
}

export const getPublicStoriesWithHalfContentModel = (req, res) => {
  return Stories.find({ published: true })
    .sort({ createdAt: -1 })
    .select(
      'title content storyImage owner categories product createdAt hexColor',
    )
    .populate('owner', 'name expertise picture username affiliateUrl')
    .populate('product', 'name id logo')
    .then((stories) => {
      if (stories && stories.length) {
        return stories.map((story) => ({
          ...story._doc,
          content: story.content.slice(0, 1000),
          _id: undefined,
          id: story._id,
        }))
      }
      return []
    })
}

export const getPublicStoriesWithHalfContentByProductIdModel = (req, res) => {
  const { productId } = req.params

  return Stories.find({ published: true, product: productId })
    .sort({ createdAt: -1 })
    .select(
      'title content storyImage owner categories product createdAt hexColor',
    )
    .populate('owner', 'name expertise picture username affiliateUrl')
    .populate('product', 'name id logo')
    .then((stories) => {
      if (stories && stories.length) {
        return stories
          .map((story) => ({
            ...story._doc,
            content: story.content.slice(0, 1000),
            _id: undefined,
            id: story._id,
          }))
          .slice(0, 3)
      }
      return []
    })
}

export const getSinglePublicStoryWithHalfContentModel = (req, res) => {
  const { id } = req.params

  return Stories.findOne({ _id: id, published: true })
    .select(
      'title content storyImage owner categories product createdAt hexColor',
    )
    .populate('owner', 'name expertise picture username affiliateUrl')
    .populate('product', 'name id logo')
    .then((story) => {
      if (!story) {
        throw new Error('Story not found.')
      }
      return {
        ...story._doc,
        content: story.content.slice(0, 1000),
      }
    })
}

export const getSingleStoryModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Stories.findOne({ _id: id, owner: ownerId }).then((story) => {
    if (!story) {
      return Promise.reject(
        new NotResourceOwnerError('Story not found or you are not the owner.'),
      )
    }
    return story
  })
}

export const createStoryModel = (req, res) => {
  const { ownerId } = req.user
  const { title, content, storyImage } = req.body

  const newStory = {
    title,
    content,
    storyImage,
    owner: ownerId,
  }

  return Stories.create(newStory).then((story) => {
    return story
  })
}

export const updateStoryModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params
  const {
    title,
    content,
    published,
    categories,
    storyImage,
    product,
    hexColor,
  } = req.body

  const updatedStory = {
    title,
    content,
    storyImage,
    published,
    categories,
    product,
    hexColor,
    owner: ownerId,
  }

  return Stories.findOne({ hexColor }).then((story) => {
    if (story && story._id.toString() !== id && !!story.hexColor) {
      return Promise.reject(
        new NotResourceOwnerError(
          'Story with this hex color already exists, please choose another.',
        ),
      )
    }
    return Stories.findOneAndUpdate({ _id: id, owner: ownerId }, updatedStory, {
      new: true,
    }).then((story) => {
      if (!story) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Story not found or you are not the owner.',
          ),
        )
      }
      return story
    })
  })
}

export const deleteStoryModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Stories.findOneAndDelete({ _id: id, owner: ownerId }).then((story) => {
    if (!story) {
      return Promise.reject(
        new NotResourceOwnerError('Story not found or you are not the owner.'),
      )
    }
    return story
  })
}
