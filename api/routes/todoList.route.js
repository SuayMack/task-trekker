import express from 'express'
import { createTodoList, deleteTodoList } from '../controllers/todolist.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken, createTodoList)
router.delete('/delete/:id', verifyToken, deleteTodoList)

export default router