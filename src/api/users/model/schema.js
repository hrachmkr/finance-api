import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseId from 'mongoose-id'

/**
 * @description Define the Users schema.
 */
const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      maxlength: 50,
      unique: false,
      trim: true,
    },
    expertise: {
      type: String,
      maxlength: 50,
      unique: false,
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
      unique: false,
    },
    uid: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    isMember: {
      type: Boolean,
      unique: false,
      required: false,
      default: false,
    },
    subscriptionId: {
      type: String,
      unique: false,
    },
    affiliateUrl: {
      type: String,
      unique: false,
    },
    arr: {
      type: Number,
      unique: false,
    },
    socialLinks: {
      type: {
        x: {
          type: String,
          default: '',
        },
        linkedin: {
          type: String,
          default: '',
        },
        instagram: {
          type: String,
          default: '',
        },
      },
      unique: false,
      required: false,
    },
    publicEmail: {
      type: String,
      unique: false,
    },
    bio: {
      type: String,
      unique: false,
    },
    aiTokenLimit: {
      type: Number,
      unique: false,
    },
    uniqueFounder: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

/**
 * @description Hide few properties & Transform _id to id.
 */
UsersSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
UsersSchema.plugin(mongooseId, { toJSON: true, toObject: false })

export default UsersSchema
