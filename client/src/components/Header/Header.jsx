import { HeaderStyle } from "./headerStyle.styles"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signOutUserStart } from "../../redux/user/userSlice"
import {deleteUserFailure, deleteUserSuccess} from "../../redux/user/userSlice.js"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)

  const dispatch = useDispatch()

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
      <div className={"logo"}>
        <Link to={"/"}>
          <h1>TaskTrekker</h1> 
        </Link>     
      </div>

      <div className={"links"}> 
      
        {currentUser ? (
          <span onClick={handleSignOut} className={"profileSiginButton"}>Sair</span>
          ) : (
          <Link to={"/signup"}>
            <p>Cadastre-se</p> 
          </Link> 
        )}
        
        {currentUser ? (
          <Link to='/profile'>
            <img className={ "avatar" } src={currentUser.avatar} alt='perfil'/>
          </Link> 
        ) : (
          <Link to='/signin'>
          <p>Login</p>
          </Link>
        )}
        
      </div> 
    </HeaderStyle>
    
  )
}
