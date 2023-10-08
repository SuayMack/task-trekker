import { Link } from "react-router-dom"
import { SignupStyle } from "./signupStyle"

export default function SignUp() {
  return (
    <SignupStyle>
      <h1>Sign Up</h1>
      <form className={"signup"}>
        <input type="text" placeholder="Username" id="username" className={"input"} />
        <input type="email" placeholder="Email" id="email" className={"input"} />
        <input type="password" placeholder="Senha" id="password" className={"input"} />
        <input type="password" placeholder="Confirme a senha" id="confirmPassword" className={"input"} />
        <button type="submit" className={"signupButton"}>Sign Up</button>
      </form>
      <div className="toSignin">
        <p>Ja tem uma conta?</p>
        <Link to={"/signin"}>
          <span className={"signinLink"}>Sign In</span>
        </Link>
      </div>
    </SignupStyle>
  )
}
