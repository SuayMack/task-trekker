import TodoList from "../models/todoList.model.js"
import { errorHandler } from "../utils/error.js"

export const createTodoList = async (req, res, next) => {
  try {
    const todoList = await TodoList.create(req.body)
    return res.status(201).json(todoList)    
  } catch (error) {
    next(errorHandler(404, 'Erro ao criar a lista de tarefas!'))
  }
}
