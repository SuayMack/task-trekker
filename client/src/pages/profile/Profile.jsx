import { useRef, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

import { app } from './../../firebase';
import { SignupStyle } from "../style/signupStyle.js"
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart} from "../../redux/user/userSlice.js"
import { Link } from "react-router-dom";
export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch()

  //salvar a foto no firebase
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({ ...formData, avatar: downloadURL })
        )
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //inicia a atualização
      dispatch(updateUserStart());
      //authoriza a atualização utilizando o fetch e o endpoit de atualização com o id do usuário
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        //metodo de requisição de atualização
        method: 'POST',
        //tipo de conteudo com o corpo da requisição em json
        headers: {
          'Content-Type': 'application/json',
        },
        //passa o corpo da requisição que está no formData
        body: JSON.stringify(formData),
      })
      //verifica se foi possível realizar a atualização em json
      const data = await res.json()
      //verifica se a atualização foi bem sucedida
      if (data.success === false) {
        //caso a atualização não seja bem sucedida
        dispatch(updateUserFailure(data.message))
        return
      }
      //caso a atualização seja bem sucedida
      //atualiza o estado do usuário
      dispatch(updateUserSuccess(data))
     //seta o estado de atualização como success
     setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

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
    <SignupStyle>
      <h1>Perfil</h1>
      <form onSubmit={handleSubmit} className={"signup"}>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        <img src={formData.avatar || currentUser.avatar} alt="perfil" className={"avatarProfile"} onClick={() => fileRef.current.click()} />

        {/* erro ao carregar a imagem */}
        <p>
          {fileUploadError ? (
            <span className={"error"}>Erro ao carregar a imagem (a imagem deve ter até 2Mb).</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className={"progress"}>Carregando... {filePerc}%</span>
          ) : filePerc === 100 ? (<span className={"success"}>Imagem carregada com sucesso</span>) : ""
          }
        </p>

        <input type="text" placeholder="Username" onChange={handleChange} id="username" defaultValue={currentUser.username} className={"input"} />
        <input type="email" placeholder="Email" onChange={handleChange} id="email" defaultValue={currentUser.email} className={"input"} />
        <input type="password" name="password" placeholder="Senha" onChange={handleChange} id="password" className={"input"} />
        
        <button type="submit" className={"signupButton"}>Atualizar</button>

      </form>
      <Link to={"/create-todo-list"}>
        <button type="submit" className={"buttonCreateTodoList"}>Criar tarefa</button>
      </Link>
      <div className={"toSignin"}>
        <span onClick={handleDeleteUser} className={"deleteAccount"}>Deletar conta</span>
        <span onClick={handleSignOut} className={"signinLink"}>Sair</span>
      </div>

      <p>{updateSuccess ? "Conta atualizada com sucesso!" : ""}</p>
    </SignupStyle>
  )
}
