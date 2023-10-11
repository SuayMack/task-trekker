import bcryptjs from 'bcryptjs';

import { errorHandler } from '../utils/error.js'
import User from './../models/user.model.js'

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
    clearCookie('access_token')
    res.status(200).json({message: 'Usuário deletado com sucesso'})
  } catch (error) {
    next(errorHandler(404, 'Usuário não encontrado'))
  }
}