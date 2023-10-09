import { Link } from "react-router-dom"
import { SignupStyle } from "./signupStyle"
import { useState } from "react"

export default function SignUp() {
  const [formData, setFormData] = useState("")

  // const handleChange = (e) => {
  //   setFormData(
  //     {
  //       ...formData,
  //       [e.target.id]: e.target.value        
  //     }
  //   )    
  // }

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
    const res = await fetch('/api/auth/signup', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <SignupStyle>
      <h1>Sign Up</h1>
      <form onSubmit={ handleSubmit } className={"signup"}>
        <input type="text" placeholder="Username" id="username" className={"input"} onChange= { handleChange } />
        <input type="email" placeholder="Email" id="email" className={"input"} onChange= { handleChange } />
        <input type="password" name="password" placeholder="Senha" id="password" className={"input"} onChange= { handleChange } />
        <button type="submit" className={"signupButton"}>Sign Up</button>
      </form>
      <div className="toSignin">
        <p>Já tem uma conta?</p>
        <Link to={"/signin"}>
          <span className={"signinLink"}>Sign In</span>
        </Link>
      </div>
    </SignupStyle>
  )
}


