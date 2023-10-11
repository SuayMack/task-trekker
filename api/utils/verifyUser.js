import jwt from  "jsonwebtoken"
import { errorHandler } from "./error.js"

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) return next(errorHandler(401, "Não autorizado."))

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(errorHandler(403, "O token é inválido."))  
      req.user = user
      next()
    }
  )
}