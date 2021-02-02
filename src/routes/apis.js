import express from 'express'
import { app as BasicAuth } from '../auth/basic_auth_instance'
import {
  verifyToken,
  authenticateAdmin,
  authenticateManagement,
  authenticateUser,
} from '../auth/jwt_auth_instance'
import controller from '../controllers'

const router = express.Router()

const {
  AuthController: { loginHandler, registerHandler },
} = controller

const dummy = async (req, res) => {
  res.send('This is api')
}

// Authentication

router.post('/register', BasicAuth, registerHandler)
router.post('/login', BasicAuth, loginHandler)

// Barang

router.post('/barang', verifyToken, authenticateManagement, dummy)
router.get('/barang/list', verifyToken, authenticateUser, dummy)
router.get('/barang/detail/:id', verifyToken, authenticateUser, dummy)
router.put('/barang/update/:id', verifyToken, authenticateManagement, dummy)
router.delete('/barang/delete/:id', verifyToken, authenticateManagement, dummy)

// Suplier

router.post('/suplier', verifyToken, authenticateManagement, dummy)
router.get('/suplier', verifyToken, authenticateManagement, dummy)
router.get('/suplier/detail/:id', authenticateManagement, verifyToken, dummy)
router.put('/suplier/update/:id', verifyToken, authenticateManagement, dummy)
router.delete('/suplier/delete/:id', verifyToken, authenticateManagement, dummy)

// Peminjaman

router.post('/peminjaman', verifyToken, authenticateUser, dummy)
router.get('/peminjaman/user', verifyToken, authenticateUser, dummy)
router.get('/peminjaman/list', verifyToken, authenticateAdmin, dummy)
router.get('/peminjaman/detail/:id', verifyToken, authenticateUser, dummy)
router.put('/peminjaman/complete/:id', verifyToken, authenticateAdmin, dummy)
router.put(
  '/peminjaman/update-peminjaman/:id',
  verifyToken,
  authenticateAdmin,
  dummy
)
router.delete('/peminjaman/delete/:id', verifyToken, authenticateAdmin, dummy)

// User

router.post('/user', verifyToken, authenticateManagement, dummy)
router.get('/user/list', verifyToken, authenticateManagement, dummy)
router.get('/user/profile', verifyToken, authenticateUser, dummy)
router.get('/user/detail/:id', verifyToken, authenticateManagement, dummy)
router.put('/user/update-profile', verifyToken, authenticateUser, dummy)
router.put('/user/update/:id', verifyToken, authenticateManagement, dummy)
router.delete('/user/delete/:id', verifyToken, authenticateManagement, dummy)

// Stock Management

router.post('/stock', verifyToken, authenticateManagement, dummy)
router.post('/stock/in/barang/:id', verifyToken, authenticateManagement, dummy)
router.post('/stock/out/barang/:id', verifyToken, authenticateManagement, dummy)
router.get('/stock/list', verifyToken, authenticateManagement, dummy)
router.get('/stock/detail/:id', verifyToken, authenticateManagement, dummy)
router.delete('/stock/delete/:id', verifyToken, authenticateManagement, dummy)

export { router }
