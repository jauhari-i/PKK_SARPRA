import express from 'express'
import path from 'path'
import { router as ApiRoutes } from './apis'

const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.use('/api', ApiRoutes)

export { router }
