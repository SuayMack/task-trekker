import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import { SignupStyle } from "../style/signupStyle.js"
import OAuth from "../../components/OAuth.jsx/OAuth"

export default function SignUp() {
  const [formData, setFormData] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      setLoading(true)
      const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)   
      setError(null)   
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <SignupStyle>
      <h1>Sign Up</h1>
      <form onSubmit={ handleSubmit } className={"signup"}>
        <input type="text" placeholder="Username" id="username" className={"input"} onChange= { handleChange } />
        <input type="email" placeholder="Email" id="email" className={"input"} onChange= { handleChange } />
        <input type="password" name="password" placeholder="Senha" id="password" className={"input"} onChange= { handleChange } />
        <button type="submit" disabled={ loading } className={"signupButton"}>
          { loading ? "Loading..." : "Cadastrar" }
        </button> 
        <OAuth />
      </form>
      <div className="toSignin">
        <p>Já tem uma conta?</p>
        <Link to={"/signin"}>
          <span className={"signinLink"}>Login</span>
        </Link>
        
      </div>
      { error && <p className={"error"}>{ error }</p>}
    </SignupStyle>
  )
}


