import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 5000

mongoose.connect(process.env.MONGODB_URL)
  .then(() => { console.log('🎉😁 - Connected to MongoDB! - 🙌')})
  .catch((error) => {console.log('😢😢 - Error connecting to MongoDB:', error)})
;

app.listen(port, () => {
  console.log(`🎉😁 - Server is running on ${port}! - 🙌`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})