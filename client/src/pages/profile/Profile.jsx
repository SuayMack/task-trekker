import { useRef, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

import { app } from './../../firebase'
import { ButtonGlobalStyle } from "../style/buttonStyle.js"
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../../redux/user/userSlice.js"
import { ProfileStyle } from "./profileStyle";
import { AiOutlineArrowDown } from "react-icons/ai";
import { errorHandler } from "../../../../api/utils/error"

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [ShowTodoslistError, setShowTodoslistError] = useState(false)
  const [userTodoslist, setUserTodoslist] = useState([])

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

  const handleShowTodoslist = async () => {
    try {
      console.log(currentUser._id)
      setShowTodoslistError(false)
      const res = await fetch(`/api/user/todolist/${currentUser._id}`)
      console.log(res)
      const data = await res.json()
      if (data.success === false) {
        setShowTodoslistError(true)
        return
      }
      setUserTodoslist(data)
    } catch (error) {
      setShowTodoslistError(true)
    }

  }

  const handleDeleteTodolist = async (todolistId) => {
    try {
      const res = await fetch(`/api/todolist/delete/${todolistId}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success === false) {
        console.loge(data.message)
        return
      }
      setUserTodoslist((prev) => prev.filter((todolist) => todolist._id !== todolistId))
    } catch (error) {
      errorHandler(404, 'Erro ao excluir a lista de tarefas!')  
    }
  }

  return (
    <ProfileStyle>
      <ButtonGlobalStyle />
      <section className={"profileSection"}>
        {userTodoslist && userTodoslist.length > 0 && (
          <div className={"showTodosList"}>
            <h1>Suas tarefas</h1>
            {userTodoslist.map((todolist) => (
              <div key={todolist._id} className={"showTodoLinks"}>
                <div>
                  <Link to={`/todolist/${todolist._id}`} className="showTodoLink" >
                    <li className={"showTodoLi"}>Título: {todolist.title}</li>
                  </Link>
                  <Link to={`/todolist/${todolist._id}`} className="showTodoLink" >
                  <li className={"showTodoLi"}>Descrição: {todolist.description}</li>
                  </Link>
                  <Link to={`/todolist/${todolist._id}`} className="showTodoLink" >
                  <li className={"showTodoLi"}>Status: {todolist.status}</li>
                  </Link>
                </div>
                <div className={"todolistButtons"}>
                  <button onClick={()=>handleDeleteTodolist(todolist._id)} className={"deleteTodoButton"}>Excluir</button>
                  <button className={"editTodoButton"}>Editar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className={"profileSection"}>
        <form onSubmit={handleSubmit} className={"profileForm"}>
          <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
          <span>Editar <AiOutlineArrowDown /></span>
          <img src={formData.avatar || currentUser.avatar} alt="perfil" className={"avatarProfile"} onClick={() => fileRef.current.click()} />

          <p>
            {fileUploadError ? (
              <span className={"error"}>Erro ao carregar a imagem (a imagem deve ter até 2Mb).</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className={"progress"}>Carregando... {filePerc}%</span>
            ) : filePerc === 100 ? (<span className={"success"}>Imagem carregada com sucesso</span>) : ""
            }
          </p>
          <input type="text" placeholder="Username" onChange={handleChange} id="username" defaultValue={currentUser.username} className={"profileInput"} />
          <input type="email" placeholder="Email" onChange={handleChange} id="email" defaultValue={currentUser.email} className={"profileInput"} />
          <input type="password" name="password" placeholder="Senha" onChange={handleChange} id="password" className={"profileInput"} />
          <button type="submit" className={"updateButtonStyle"}>Atualizar</button>
        </form>
        <Link to={"/create-todo-list"} className={"profileLinkButton"}>
          <button type="submit" className={"createButtonStyle"}>Criar tarefa</button>
        </Link>
        <p>{updateSuccess ? "Conta atualizada com sucesso!" : ""}</p>
        <button onClick={handleShowTodoslist} className={"showButtonStyle"}>Mostrar tarefas</button>
        <p>{ShowTodoslistError ? "Erro ao mostrar lista de tarefas" : ""}</p>
      </section>


    </ProfileStyle>
  )
}
