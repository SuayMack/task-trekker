import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import todoRouter from './routes/todoList.route.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

const port = 5000

mongoose.connect(process.env.MONGODB_URL)
  .then(() => { console.log('🎉😁 - Connected to MongoDB! - 🙌')})
  .catch((error) => {console.log('😢😢 - Error connecting to MongoDB:', error)})
;

app.listen(port, () => {
  console.log(`🎉😁 - Server is running on ${port}! - 🙌`)
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/todolist', todoRouter)

//middleware for errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({ 
    success: false,
    statusCode: statusCode,
    message,
  })
})