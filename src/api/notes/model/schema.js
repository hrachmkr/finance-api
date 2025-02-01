import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseId from 'mongoose-id'

const NotesSchema = new mongoose.Schema(
  {
    date: {
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
NotesSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
NotesSchema.plugin(mongooseId, { toJSON: true, toObject: false })

export default NotesSchema
