import mongoose from 'mongoose'
import ProjectsSchema from './schema.js'

import ErrorsUtil from '../../../util/errors.util.js'

const { NotResourceOwnerError } = ErrorsUtil

const Projects = mongoose.model('Projects', ProjectsSchema)

export const getProjectsModel = (req, res) => {
  const { ownerId } = req.user

  return Projects.find({ ownerId: ownerId }).then((projects) => {
    if (projects && projects.length) {
      return projects
    }
    return []
  })
}

export const getSingleProjectModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Projects.findOne({ _id: id, ownerId: ownerId }).then((project) => {
    if (!project) {
      return Promise.reject(
        new NotResourceOwnerError(
          'Project not found or you are not the owner.',
        ),
      )
    }
    return project
  })
}

export const createProjectModel = (req, res) => {
  const { ownerId } = req.user
  const newProject = { ...req.body, ownerId: ownerId }

  return Projects.create(newProject).then((project) => {
    return project
  })
}

export const updateProjectModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  const updatedProject = {
    ...req.body,
    ownerId: ownerId,
  }

  return Projects.findOneAndUpdate(
    { _id: id, ownerId: ownerId },
    updatedProject,
    {
      new: true,
    },
  ).then((project) => {
    if (!project) {
      return Promise.reject(
        new NotResourceOwnerError(
          'Project not found or you are not the owner.',
        ),
      )
    }
    return project
  })
}

export const deleteProjectModel = (req, res) => {
  const { ownerId } = req.user
  const { id } = req.params

  return Projects.findOneAndDelete({ _id: id, ownerId: ownerId }).then(
    (project) => {
      if (!project) {
        return Promise.reject(
          new NotResourceOwnerError(
            'Project not found or you are not the owner.',
          ),
        )
      }
      return project
    },
  )
}
