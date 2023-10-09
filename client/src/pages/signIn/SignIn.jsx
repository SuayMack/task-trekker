import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SignupStyle } from "../SignUp/signUpStyle"
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice.js"
import OAuth from "../../components/OAuth.jsx/OAuth"

export default function SignIn() {
  const [formData, setFormData] = useState("")
  const {loading, error} = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value 
      }
    )    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <SignupStyle>
      <h1>Sign In</h1>
      <form onSubmit={ handleSubmit } className={"signup"}>
        <input type="email" placeholder="Email" id="email" className={"input"} onChange= { handleChange } />
        <input type="password" name="password" placeholder="Senha" id="password" className={"input"} onChange= { handleChange } />
        <button type="submit" disabled={ loading } className={"signupButton"}>
          { loading ? "Loading..." : "Sign in" }
        </button> 
        <OAuth />
      </form>
      <div className="toSignin">
        <p>Não tem uma conta?</p>
        <Link to={"/signup"}>
          <span className={"signinLink"}>Cadastrar</span>
        </Link> 
      </div>
      { error && <p className={"error"}>{ error }</p>}
    </SignupStyle>
  )
}