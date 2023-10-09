import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { signInSuccess } from "../../redux/user/userSlice"
import { app } from "../../firebase"
import { OAuthStyle } from "./oAuthStyle"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

export default function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })        
      })
      const data = await res.json()
      dispatch(signInSuccess(data))   
      navigate("/")

    } catch (error) {
      console.log("Não foi possível realizar o login com o Google", error)
    }
  }
  
  return (
    <OAuthStyle>
      <button onClick={ handleGoogleClick } type="button">Continue with Google</button>
    </OAuthStyle>
  )
}
