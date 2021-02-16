import User from '../models/User'
import bcryptjs from 'bcryptjs'

export const listUser = async () => {
  try {
    const user = await User.find({ level: 0 })
    if (user.length === 0) {
      throw {
        success: true,
        message: 'Get User Success!',
        statusCode: 200,
        data: [],
      }
    } else {
      const data = user.map(item => ({
        userId: item.userId,
        name: item.name,
        username: item.username,
        profilePicture: item.profilePicture,
      }))

      return {
        success: true,
        message: 'Get User Success!',
        statusCode: 200,
        data,
      }
    }
  } catch (error) {
    return error
  }
}

export const detailUser = async id => {
  try {
    const user = await User.findOne({ userId: id, level: 0 })
    if (!user) {
      throw {
        success: false,
        message: 'User not found!',
        statusCode: 404,
      }
    } else {
      const data = {
        userId: user.userId,
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture,
      }

      return {
        success: true,
        message: 'Get detail User Success',
        statusCode: 200,
        data,
      }
    }
  } catch (error) {
    return error
  }
}

export const listManagement = async () => {
  try {
    const user = await User.find({ level: 1 })
    if (user.length === 0) {
      throw {
        success: true,
        message: 'Get Management Success!',
        statusCode: 200,
        data: [],
      }
    } else {
      const data = user.map(item => ({
        userId: item.userId,
        name: item.name,
        username: item.username,
        profilePicture: item.profilePicture,
      }))

      return {
        success: true,
        message: 'Get Management Success!',
        statusCode: 200,
        data,
      }
    }
  } catch (error) {
    return error
  }
}

export const listAdmin = async () => {
  try {
    const user = await User.find({ level: 2 })
    if (user.length === 0) {
      throw {
        success: true,
        message: 'Get Admin Success!',
        statusCode: 200,
        data: [],
      }
    } else {
      const data = user.map(item => ({
        userId: item.userId,
        name: item.name,
        username: item.username,
        profilePicture: item.profilePicture,
      }))

      return {
        success: true,
        message: 'Get Admin Success!',
        statusCode: 200,
        data,
      }
    }
  } catch (error) {
    return error
  }
}

export const updateUser = async (id, data) => {
  try {
    const user = await User.findOne({ userId: id, level: 0 })
    if (!user) {
      throw {
        success: false,
        message: 'User not found!',
        statusCode: 404,
      }
    } else {
      const { name, username, level, profilePicture } = data
      const updateQuery = await User.updateOne(
        {
          userId: user.userId,
        },
        { name, username, level, profilePicture }
      )
      if (!updateQuery) {
        throw {
          statusCode: 500,
          message: 'Internal server error, failed to update User',
          success: false,
        }
      } else {
        return {
          success: true,
          message: 'Update success',
          statusCode: 200,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const updateUserPassword = async (id, data) => {
  try {
    const user = await User.findOne({ userId: id, level: 0 })
    if (!user) {
      throw {
        success: false,
        message: 'User not found!',
        statusCode: 404,
      }
    } else {
      const { oldPassword, password } = data
      const isMatch = await bcryptjs.compareSync(oldPassword, user.password)

      if (!isMatch) {
        throw {
          statusCode: 400,
          message: 'Old password not match',
          success: false,
        }
      }
      const salt = await bcryptjs.genSaltSync(10)

      const encPass = await bcryptjs.hashSync(password, salt)

      const updateQuery = await User.updateOne(
        {
          userId: user.userId,
        },
        { password: encPass }
      )
      if (!updateQuery) {
        throw {
          statusCode: 500,
          message: 'Internal server error, failed to update User',
          success: false,
        }
      } else {
        return {
          success: true,
          message: 'Update success',
          statusCode: 200,
        }
      }
    }
  } catch (error) {
    return error
  }
}

export const deleteUser = async id => {
  try {
    const user = await User.findOne({ userId: id, level: 0 })
    if (!user) {
      throw {
        success: false,
        message: 'User not found!',
        statusCode: 404,
      }
    } else {
      const deleteQuery = await User.deleteOne({ userId: user.userId })
      if (!deleteQuery) {
        throw {
          statusCode: 500,
          message: 'Internal server error, failed to delete User',
          success: false,
        }
      } else {
        return {
          success: true,
          message: 'Delete success',
          statusCode: 200,
        }
      }
    }
  } catch (error) {
    return error
  }
}
