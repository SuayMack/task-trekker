import bcryptjs from 'bcryptjs';

import { errorHandler } from '../utils/error.js'
import User from './../models/user.model.js'
import TodoList from '../models/todoList.model.js'

export const test = (req, res) => {
  res.json({ message: '🎉😁 - Api route is working - 🙌'})
}

export const updateUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) 
    return next(errorHandler(401, 'Não autorizado'))
  try {
    if(req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, { 
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      }}, { new: true })
      const {password, ...rest} = updateUser._doc
      res.status(200).json(rest)
  } catch (error) {
    next(errorHandler(404, 'Você só pode atualizar a sua conta.'))
  }
  
}

export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) 
    return next(errorHandler(401, 'Usuário não autorizado'))
  try {
    await User.findByIdAndDelete(req.params.id)
    //limpa o cookie e deleta o usuário
    res.clearCookie('access_token')
    res.status(200).json({message: 'Usuário deletado com sucesso'})
  } catch (error) {
    next(errorHandler(404, 'Usuário não encontrado'))
  }
}

export const getUserTodoslist = async (req, res, next) => {
  if(req.user.id === req.params.id) {
    try {
      const todoslist = await TodoList.find({ userRef: req.params.id })
      res.status(200).json(todoslist)
    } catch (error) {
      next(error)
    }
  }else {
    return next(errorHandler(401, 'Usuário não autorizado'))
  }
}

// export const geListUser = async (req, res, next) => {
//   if(req.user.id === req.params.id) {
//     try {
//       const user = await userRef.findById({userRef: req.params.id})
//       const userList = await TodoItems.find({statusType: req.params.status})
//       console.log(user, userList)
//       res.status(200).json(user, userList)
//     } catch (error) {
//       next(error)
//     }
//   }else {
//     return next(errorHandler(401, 'Usuário não autorizado'))
//   }
// }