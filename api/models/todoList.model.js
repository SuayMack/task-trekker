import mongoose from "mongoose"

const todoListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
    required: true
  },
  userRef: {    
    type: String,
    required: true

  }
}, { timestamps: true })

const TodoList = mongoose.model("TodoList", todoListSchema)
export default TodoList