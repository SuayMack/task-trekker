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
      <Link to={"/signin"}>
        <p>SignIn</p>
      </Link>   
      {/* <FaHands />
      <p>Bem vindo(a), Priscila </p>
      <IoMdCalendar />
      <p>03/10/2023</p>
      <Link to={"/profile"}> <img src="https://picsum.photos/id/237/200" alt="" className={"img"} /></Link>
      <img src="https://picsum.photos/id/237/200" alt="" className={"img"} /> */}      
    </HeaderStyle>
    
  )
}
