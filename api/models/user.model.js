import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://img.freepik.com/vetores-gratis/cao-husky-bonito-piloto-dos-desenhos-animados-vector-icon-ilustracao-conceito-de-icone-de-transporte-animal-isolado_138676-7486.jpg?w=740&t=st=1696887344~exp=1696887944~hmac=6169696cca801147fca71b43bb56fa3085c1a3f354693a6c6a14344a5288798a'
  }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User