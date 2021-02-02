import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import { getConfig } from '../config/global_config'
import { handleError } from '../helpers/error'

const jwt = jsonwebtoken
const getKey = keyPath => fs.readFileSync(keyPath, 'utf-8')

export const generateToken = async payload => {
  let privateKey = getKey(getConfig('/privateKey'))
  const verifyOptions = {
    algorithm: 'RS256',
    expiresIn: '24h',
  }
  const token = await jwt.sign(payload, privateKey, verifyOptions)
  return token
}

export const getToken = headers => {
  if (
    headers &&
    headers.authorization &&
    headers.authorization.includes('Bearer')
  ) {
    const parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    }
  }
  return undefined
}

export const verifyToken = async (req, res, next) => {
  const publicKey = fs.readFileSync(getConfig('/publicKey'), 'utf8')
  const verifyOptions = {
    algorithm: 'RS256',
  }

  const token = getToken(req.headers)
  if (!token) {
    return handleError({ statusCode: 401, message: 'Token is not valid!' }, res)
  }
  let decodedToken
  try {
    decodedToken = await jwt.verify(token, publicKey, verifyOptions)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return handleError(
        { statusCode: 401, message: 'Access token expired!' },
        res
      )
    }
    return handleError({ statusCode: 401, message: 'Token is not valid!' }, res)
  }
  const userId = decodedToken.sub
  const roles = decodedToken.roles
  req.userId = userId
  req.roles = roles
  next()
}

export const authenticateUser = async (req, res, next) => {
  const roles = req.roles
  if (roles !== 0 || roles !== 1 || roles !== 2) {
    return handleError({ statusCode: 401, message: 'Please Login First' }, res)
  } else {
    next()
  }
}

export const authenticateManagement = async (req, res, next) => {
  const roles = req.roles
  if (roles !== 1 || roles !== 2) {
    return handleError({ statusCode: 403, message: 'Access Forbidden!' }, res)
  } else {
    next()
  }
}

export const authenticateAdmin = async (req, res, next) => {
  const roles = req.roles
  if (roles !== 2) {
    return handleError({ statusCode: 403, message: 'Access Forbidden!' }, res)
  } else {
    next()
  }
}
