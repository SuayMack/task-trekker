import express from 'express'
import { test, updateUser, deleteUser, getUserTodoslist } from '../../controllers/user.controller.js'
import { verifyToken } from '../../utils/verifyUser.js'

const router = express.Router()

//rotas do usuário
router.get('/test',test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/todolist/:id', verifyToken, getUserTodoslist)

export default router