import {
  getProjectsModel,
  getSingleProjectModel,
  createProjectModel,
  updateProjectModel,
  deleteProjectModel,
} from '../model/index.js'

import {
  handleList,
  handleGet,
  handleAdd,
  handleUpdate,
  handleDelete,
} from '../../../util/success-handler.util.js'

export const getProjects = async (request, response, next) => {
  try {
    const projects = await getProjectsModel(request, response)
    return handleList(response, projects)
  } catch (error) {
    next(error)
  }
}

export const getSingleProject = async (request, response, next) => {
  try {
    const project = await getSingleProjectModel(request, response)
    return handleGet(response, project)
  } catch (error) {
    next(error)
  }
}

export const createProject = async (request, response, next) => {
  try {
    const project = await createProjectModel(request, response)
    return handleAdd(response, project)
  } catch (error) {
    next(error)
  }
}

export const updateProject = async (request, response, next) => {
  try {
    const project = await updateProjectModel(request, response)
    return handleUpdate(response, project)
  } catch (error) {
    next(error)
  }
}

export const deleteProject = async (request, response, next) => {
  try {
    const project = await deleteProjectModel(request, response)
    return handleDelete(response, project)
  } catch (error) {
    next(error)
  }
}
