import express from 'express'
import { createTodoList, deleteTodoList, updateTodoList, getListing, getListings } from '../controllers/todolist.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken, createTodoList)
router.delete('/delete/:id', verifyToken, deleteTodoList)
router.post('/update/:id', verifyToken, updateTodoList)
router.get('/get/:id', getListing)
router.get('/get', getListings)

export default router