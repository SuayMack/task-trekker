import express from 'express'
import { createTodoList } from '../controllers/todolist.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken, createTodoList )

export default router