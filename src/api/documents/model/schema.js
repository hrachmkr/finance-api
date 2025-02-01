import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseId from 'mongoose-id'

const DocumentsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: false,
      maxlength: 500,
      required: false,
      trim: true,
    },
    content: {
      type: String,
      unique: false,
      required: false,
      trim: true,
    },
    ownerId: {
      type: String,
      unique: false,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
)

/**
 * @description Hide few properties & Transform _id to id.
 */
DocumentsSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
DocumentsSchema.plugin(mongooseId, { toJSON: true, toObject: false })

export default DocumentsSchema
