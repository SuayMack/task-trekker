import { useSelector } from "react-redux";

import { SignupStyle } from './../SignUp/signupStyle';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <SignupStyle>
      <h1>Perfil</h1>
      <form className={"signup"}>
        <img src={currentUser.avatar} alt="perfil" className={ "avatarProfile" } />
        <input type="text" placeholder="Username" id="username" className={"input"} />
        <input type="email" placeholder="Email" id="email" className={"input"} />
        <input type="password" name="password" placeholder="Senha" id="password" className={"input"} />
        <button type="submit" className={"signupButton"}>Atualizar</button>        
      </form>
      <div className="toSignin">
        <span className={"deleteAccount"}>Deletar conta</span>
        <span className={"signinLink"}>Sair</span>
      </div>
    </SignupStyle>
  )
}
