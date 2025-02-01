import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseId from 'mongoose-id'

const StoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: false,
      maxlength: 500,
      required: false,
      trim: true,
    },
    storyImage: {
      type: String,
      unique: false,
      required: false,
      trim: true,
    },
    content: {
      type: String,
      unique: false,
      required: false,
      trim: true,
    },
    categories: {
      type: [String],
      unique: false,
      required: false,
      trim: true,
    },
    published: {
      type: Boolean,
      unique: false,
      required: false,
      default: false,
    },
    hexColor: {
      type: String,
      unique: false,
      required: false,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
    },
  },
  { timestamps: true },
)

/**
 * @description Hide few properties & Transform _id to id.
 */
StoriesSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
StoriesSchema.plugin(mongooseId, { toJSON: true, toObject: false })

export default StoriesSchema
