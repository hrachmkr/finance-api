import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseId from 'mongoose-id'

const TaskDataContentSchema = new mongoose.Schema(
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
      maxlength: 1000,
      required: false,
      trim: true,
    },
    descriptionContent: {
      type: String,
      unique: false,
      maxlength: 1000,
      required: false,
      trim: true,
    },
    checked: { type: Boolean, unique: false, required: false, trim: true },
  },
  { timestamps: true },
)

TaskDataContentSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
TaskDataContentSchema.plugin(mongooseId, { toJSON: true, toObject: false })

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: false,
      maxlength: 500,
      required: false,
      trim: true,
    },
    dataContent: [TaskDataContentSchema],
  },
  { timestamps: true },
)

TaskSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
TaskSchema.plugin(mongooseId, { toJSON: true, toObject: false })

const ProjectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: false,
      maxlength: 500,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      unique: false,
      maxlength: 1000,
      required: false,
      trim: true,
    },
    tasks: [TaskSchema],
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
ProjectsSchema.plugin(mongooseHidden, {
  defaultHidden: { index: true, __v: true },
})
ProjectsSchema.plugin(mongooseId, { toJSON: true, toObject: false })

export default ProjectsSchema
