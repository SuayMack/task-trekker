import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import todoRouter from './routes/todolist.route.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

const port = 5000

mongoose.connect(process.env.MONGODB_URL)
  .then(() => { console.log('🎉😁 - Connected to MongoDB! - 🙌')})
  .catch((error) => {console.log('😢😢 - Error connecting to MongoDB:', error)})
;

const __dirname = path.resolve()

app.listen(port, () => {
  console.log(`🎉😁 - Server is running on ${port}! - 🙌`)
})

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/todolist', todoRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {  
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

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