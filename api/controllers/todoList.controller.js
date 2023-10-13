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

export const deleteTodoList = async (req, res, next) => {
  const todolist = await TodoList.findById(req.params.id)
  if (!todolist) {
    return next(errorHandler(404, 'Lista de tarefas não encontrada!'))
  }
  if(req.user.id !== todolist.userRef.toString()) {
    return next(errorHandler(401, 'Usuário não autorizado'))
  }
  try {
    await TodoList.findByIdAndDelete(req.params.id)
    return res.status(200).json({message: 'Lista de tarefas excluída com sucesso!'})
  } catch (error) {
    next(errorHandler(404, 'Erro ao excluir a lista de tarefas!'))
  }
  
}

export const updateTodoList = async (req, res, next) => {
  const todolist = await TodoList.findById(req.params.id)
  if (!todolist) {
    return next(errorHandler(404, 'Lista de tarefas não encontrada!'))
  }
  if(req.user.id !== todolist.userRef) {
    return next(errorHandler(401, 'Usuário não autorizado'))
  }
  console.log(req.body)
  try {
    const updatedTodolist = await TodoList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    console.log(updatedTodolist)
    res.status(200).json(updatedTodolist);
  } catch (error) {
    next(error);
  }
}
