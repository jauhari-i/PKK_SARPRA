import services from '../services'
import { UPDATE_PASSWORD_INPUT, UPDATE_USER_INPUT } from '../constants/input'
import validate from '../helpers/validation'
import { handleError } from '../helpers/error'

const {
  userServices: {
    deleteUser,
    detailUser,
    listAdmin,
    listManagement,
    listUser,
    updateUser,
    updateUserPassword,
  },
} = services

const controller = {
  deleteUserHandler: async (req, res) => {
    const { id } = req.params
    const query = await deleteUser(id)
    if (!query.success) {
      handleError(query, res)
    } else {
      res.status(query.statusCode).json(query)
    }
  },
  detailUserHandler: async (req, res) => {
    const { id } = req.params
    const query = await detailUser(id)
    if (!query.success) {
      handleError(query, res)
    } else {
      res.status(query.statusCode).json(query)
    }
  },
  getAdmin: async (req, res) => {
    const query = await listAdmin()
    if (!query.success) {
      handleError(query, res)
    } else {
      res.status(query.statusCode).json(query)
    }
  },
  getManagement: async (req, res) => {
    const query = await listManagement()
    if (!query.success) {
      handleError(query, res)
    } else {
      res.status(query.statusCode).json(query)
    }
  },
  getUser: async (req, res) => {
    const query = await listUser()
    if (!query.success) {
      handleError(query, res)
    } else {
      res.status(query.statusCode).json(query)
    }
  },
  updateUserHandler: async (req, res) => {
    const { name, username, level, profilePicture } = req.body

    const { id } = req.params

    const data = {
      name,
      username,
      level,
      profilePicture,
    }

    const validation = await validate(UPDATE_USER_INPUT, data)
    if (validation.error) {
      validation.statusCode = 400
      handleError(validation, res)
    } else {
      const query = await updateUser(id, data)
      if (!query.success) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    }
  },
  updateProfileHandler: async (req, res) => {
    const { name, username, level, profilePicture } = req.body

    const id = req.userId

    const data = {
      name,
      username,
      level,
      profilePicture,
    }

    const validation = await validate(UPDATE_USER_INPUT, data)
    if (validation.error) {
      validation.statusCode = 400
      handleError(validation, res)
    } else {
      const query = await updateUser(id, data)
      if (!query.success) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    }
  },
  updatePasswordHandler: async (req, res) => {
    const { oldPassword, password, confirmPassword } = req.body
    const id = req.userId

    const data = {
      oldPassword,
      password,
      confirmPassword,
    }

    const validation = await validate(UPDATE_PASSWORD_INPUT, data)
    if (validation.error) {
      validation.statusCode = 400
      handleError(validation, res)
    } else {
      const query = await updateUserPassword(id, data)
      if (!query.success) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    }
  },
}

export { controller }
