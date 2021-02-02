import services from '../services'
import { LOGIN_INPUT, REGISTER_INPUT } from '../constants/input'
import validate from '../helpers/validation'
import { handleError } from '../helpers/error'
const { loginService, registerService } = services

const controller = {
  loginHandler: async (req, res) => {
    const { username, password } = req.body
    const data = { username, password }
    const validation = await validate(LOGIN_INPUT, data)
    if (validation.error) {
      validation.statusCode = 400
      handleError(validation, res)
    } else {
      const query = await loginService({ username, password })
      if (query.error) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    }
  },
  registerHandler: async (req, res) => {
    const { name, username, password, confirmPassword } = req.body
    const data = {
      name,
      username,
      password,
      confirmPassword,
    }
    const validation = await validate(REGISTER_INPUT, data)
    if (validation.error) {
      validation.statusCode = 400
      handleError(validation, res)
    } else {
      const query = await registerService(data)
      if (query.error) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    }
  },
}

export { controller }
