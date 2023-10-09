import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword })
  try {
    await newUser.save()
    res.status(201).json("🎉 Usuário criado com sucesso! 😁")
  } catch (error) {
    next(errorHandler(406, 'Usuário ou Email já cadastrado!'))
  }   
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, 'Usuário ou Email não encontrado!'))

    const isPasswordCorrect = bcryptjs.compareSync(password, validUser.password)
    if (!isPasswordCorrect) return next(errorHandler(401, 'Usuário e/ou Senha incorretos!'))
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    // para não enviar o password
    const { password: password, ...rest } = validUser._doc
    res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .json(rest)
    //ex como colocar data de expirção do cookie
    //res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) })
  } catch (error) {
    next(errorHandler(404, 'Usuário ou Email não encontrado!'))
  }
}