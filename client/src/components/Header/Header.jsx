import { HeaderStyle } from "./headerStyle.styles"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from "../../redux/user/userSlice.js"
import { useDispatch } from "react-redux"

import { FaSistrix } from "react-icons/fa6";


export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  
  const dispatch = useDispatch()

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  return (
    <HeaderStyle>
      <div>
      <Link to={"/"}>
        <h1>TaskTrekker</h1>  
      </Link>     
      <form>
        <input type="text" placeholder="Pesquisar..." className={"input"}  />
        <FaSistrix className={ "icon" } /> 
      </form>  
      </div>

      <div className={"links"}>
   
        <Link to={"/signup"}>
          {currentUser ? (
            <div className={"profileDeleteSignOut"}>
              <span onClick={handleDeleteUser} className={"deleteAccount"}>Deletar conta</span>
              <span onClick={handleSignOut} className={"profileSiginButton"}>Sair</span>
            </div>
            ) : (
              <p>Cadastre-se</p> 
            )}
          
        </Link> 
        <Link to='/profile'>
            {currentUser ? (
              <img className={ "avatar" } src={currentUser.avatar} alt='perfil'/>
            ) : (
              <p>Login</p>
            )}
        </Link> 
      </div> 
    </HeaderStyle>
    
  )
}
