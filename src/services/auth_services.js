import User from '../models/User'
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { generateToken } from '../auth/jwt_auth_instance'

export const loginService = async data => {
  const { username, password } = data

  try {
    const user = await User.findOne({ username: username })

    // check user
    if (user) {
      // check password
      const isMatch = await bcrypt.compareSync(password, user.password)
      if (isMatch) {
        // create payload
        const payload = {
          sub: user.userId,
          roles: user.level,
          username: user.username,
        }

        // generate token for user

        const token = await generateToken(payload)

        return {
          error: false,
          statusCode: 200,
          message: 'Login Success',
          data: {
            accessToken: token,
          },
        }
      } else {
        throw {
          error: true,
          message: 'Password not match',
          statusCode: 400,
        }
      }
    } else {
      throw {
        error: true,
        message: 'Username not found',
        statusCode: 404,
      }
    }
  } catch (error) {
    return error
  }
}
export const registerService = async data => {
  const { name, username, password } = data

  try {
    const user = await User.findOne({ username: username })
    if (user) {
      throw {
        error: true,
        message: 'Username already exist!',
        statusCode: 400,
      }
    } else {
      const salt = await bcrypt.genSaltSync(10)
      const encPass = await bcrypt.hashSync(password, salt)
      if (!encPass) {
        throw {
          error: true,
          message: 'Failed to encrypt user password',
          statusCode: 400,
        }
      } else {
        const newUser = await User.create({
          userId: uuid(),
          name,
          username,
          password: encPass,
        })
        if (newUser) {
          return {
            error: false,
            message: 'Register success!',
            data: {
              userId: newUser.userId,
            },
            statusCode: 200,
          }
        } else {
          throw {
            error: true,
            message: 'Internal server error',
            statusCode: 500,
          }
        }
      }
    }
  } catch (error) {
    return error
  }
}
