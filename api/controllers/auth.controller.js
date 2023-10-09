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

export const signin = async (req, res, next) => {
  
  //desestruturar email e password
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, 'Usuário ou Email não encontrado!'))

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Usuário e/ou Senha incorretos!'))
    //se tudo correr bem, cria o token com o jwt
    // passar o id do usuário e o secret
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    // para não enviar o password:
    const { password: pass, ...rest } = validUser._doc
    //usamos o rest para excluir a propriedade password
    //usamos o httpOnly para ocultar o token e deixar mais seguro
    //usamos o json para retornar o token
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest)
    //ex como colocar data de expirção do cookie
    //res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) })
  } catch (error) {
    next(errorHandler(404, 'Usuário ou Email não encontrado!'))
  }
}