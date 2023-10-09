import { HeaderStyle } from "./headerStyle.styles"
import { Link } from "react-router-dom"

import { FaSistrix } from "react-icons/fa6";

export default function Header() {
  return (
    <HeaderStyle>
      <Link to={"/"}>
        <h1>TaskTrekker</h1>  
      </Link>     
      <form>
        <input type="text" placeholder="Pesquisar..." className={"input"}  />
        <FaSistrix className={ "icon" } /> 
      </form>  
      <div className={"links"}>
        <Link to={"/signup"}>
          <p>Cadastre-se</p>
        </Link>   
        <Link to={"/signin"}>
          <p>Login</p>
        </Link>         
      </div> 
    </HeaderStyle>
    
  )
}
