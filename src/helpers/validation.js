import { LOGIN_INPUT, REGISTER_INPUT } from '../constants/input'

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
    default:
      return {
        error: false,
        message: '',
      }
  }
}

export default validate
