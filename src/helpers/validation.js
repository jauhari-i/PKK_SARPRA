import {
  LOGIN_INPUT,
  REGISTER_INPUT,
  UPDATE_PASSWORD_INPUT,
  UPDATE_USER_INPUT,
} from '../constants/input'

const validate = (type, data) => {
  switch (type) {
    case LOGIN_INPUT:
      return {
        error: !data.username ? true : !data.password ? true : false,
        message: !data.username
          ? 'Username tidak boleh kosong!'
          : !data.password
          ? 'Kata sandi tidak boleh kosong'
          : !data.username && !data.password && 'Data login harus diisi!',
      }
    case REGISTER_INPUT:
      return {
        error: !data.name
          ? true
          : !data.username
          ? true
          : !data.password
          ? true
          : !data.confirmPassword
          ? true
          : data.password !== data.confirmPassword
          ? true
          : false,
        message: !data.name
          ? 'Nama tidak boleh kosong!'
          : !data.username
          ? 'Username tidak boleh kosong!'
          : !data.password
          ? 'Kata sandi tidak boleh kosong'
          : !data.confirmPassword
          ? 'Konfirmasi kata sandi anda'
          : data.password !== data.confirmPassword &&
            'Konfirmasi Kata sandi tidak sama',
      }
    case UPDATE_PASSWORD_INPUT:
      return {
        error: !data.oldPassword
          ? true
          : !data.password
          ? true
          : !data.confirmPassword
          ? true
          : data.password !== data.confirmPassword
          ? true
          : false,
        message: !data.oldPassword
          ? 'Kata sandi lama tidak boleh kosong'
          : !data.password
          ? 'Kata sandi baru tidak boleh kosong'
          : !data.confirmPassword
          ? 'Konfirmasi kata sandi baru'
          : data.password !== data.confirmPassword &&
            'Konfirmasi kata sandi tidak sama',
      }
    case UPDATE_USER_INPUT:
      return {
        error: !data.name
          ? true
          : !data.username
          ? true
          : !data.level
          ? true
          : !data.profilePicture
          ? true
          : false,
        message: !data.name
          ? 'Nama tidak boleh kosong'
          : !data.username
          ? 'Username tidak boleh kosong'
          : !data.level
          ? 'Level tidak boleh kosong'
          : !data.profilePicture && 'Gambar tidak boleh kosong',
      }
    default:
      return {
        error: false,
        message: '',
      }
  }
}

export default validate
