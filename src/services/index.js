// place services here
import { loginService, registerService } from './auth_services'
import {
  deleteUser,
  detailUser,
  listAdmin,
  listManagement,
  listUser,
  updateUser,
  updateUserPassword,
} from './user_services'

const userServices = {
  deleteUser,
  detailUser,
  listAdmin,
  listManagement,
  listUser,
  updateUser,
  updateUserPassword,
}

const services = {
  loginService,
  registerService,
  userServices,
}

export default services
