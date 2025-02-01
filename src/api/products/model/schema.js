import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseId from 'mongoose-id'

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
      maxlength: 500,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      unique: false,
      maxlength: 5000,
      required: false,
      trim: true,
    },
    state: {
      type: String,
      unique: false,
      maxlength: 100,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      unique: false,
      maxlength: 100,
      required: false,
      trim: true,
    },
    mrr: {
      type: Number,
      unique: false,
      required: false,
    },
    demoLink: {
      type: String,
      unique: false,
      maxlength: 500,
      required: false,
      trim: true,
    },
    tags: {
      type: [String],
      unique: false,
      required: false,
      trim: true,
    },
    techStack: {
      type: [String],
      unique: false,
      required: false,
      trim: true,
    },
    marketingChannels: {
      type: [String],
      unique: false,
      required: false,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      unique: false,
      required: false,
    },
    logo: {
      type: String,
      unique: false,
      maxlength: 500,
      required: false,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      unique: false,
      required: false,
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    habitStrike: {
      type: [
        {
          date: {
            type: String,
            default: '',
          },
          content: {
            type: String,
            default: '',
          },
        },
      ],
      unique: false,
      required: false,
    },
    needHelp: {
      type: Boolean,
      unique: false,
      required: false,
    },
    helpStatus: {
      type: String,
      unique: false,
      maxlength: 1000,
      required: false,
      trim: true,
    },
    images: {
      type: [String],
      unique: false,
      required: false,
      trim: true,
    },
    // ownerId: {
    //   type: String,
    //   unique: false,
    //   required: true,
    //   trim: true,
    // },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true },
)

ProductsSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
ProductsSchema.plugin(mongooseId, { toJSON: true, toObject: false })

export default ProductsSchema
