import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseId from 'mongoose-id'

const MediasSchema = new mongoose.Schema(
  {
    filePath: { type: String },
    mimeType: { type: String },
    ownerId: { type: String },
  },
  { timestamps: true },
)

MediasSchema.index({ ownerId: 1 })

/**
 * @description Hide few properties & Transform _id to id.
 */
MediasSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
MediasSchema.plugin(mongooseId, { toJSON: true, toObject: false })

export default MediasSchema
