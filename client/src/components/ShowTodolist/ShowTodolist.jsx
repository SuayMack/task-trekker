import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from './../../firebase'

import { errorHandler } from "../../../../api/utils/error"
import { ButtonGlobalStyle } from "../../style/buttonStyle.js"
import { ShowTodolistStyle } from "./showTodolistStyle"

export default function ShowTodolist() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file] = useState(undefined)
  const [ setFilePerc] = useState(0);
  const [setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [ShowTodoslistError, setShowTodoslistError] = useState(false)
  const [showTodoslist, setShowTodoslist] = useState()
  const [userTodoslist, setUserTodoslist] = useState([])
  
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

  const handleShowTodoslist = async () => {
    try {
      const res = await fetch(`/api/user/todolist/${currentUser._id}`)
      const data = await res.json()
      if (data.length == 0) {
        setShowTodoslist("{<p>Voce ainda não tem tarefas</p>}")
      }
      if (data.success === false) {
        setShowTodoslistError(true)
        console.log(setShowTodoslistError(true))
      }
      setUserTodoslist(data)
      console.log(data)
    } catch (error) {
      setShowTodoslistError(true)
    }
  }

  // const handleFilterAFazer = async () => {
  //   {userTodoslist && userTodoslist.length > 0 && (
  //     <div className={"showTodosList"}>
  //       {userTodoslist.map((todolist) => (
  //        todolist.statusType = "a_fazer"(
  //         <div key={todolist._id} className={"showTodoLinks"}>
  //           <div className={"showTodo"}>
  //             <Link className="showTodoLink" >
  //               <li className={"showTodoLi"}>Título: {todolist.title}</li>
  //             </Link>
  //             <Link className="showTodoLink" >
  //               <li className={"showTodoLi"}>Descrição: {todolist.description}</li>
  //             </Link>
  //             <Link className="showTodoLink" >
  //               <li className={"showTodoLi"}>Status: {todolist.statusType = "feito"}</li>
  //             </Link>
  //           </div>
  //           <div className={"todolistButtons"}>
  //             <button onClick={() => handleDeleteTodolist(todolist._id)} className={"deleteTodoButton"}>Excluir</button>
  //             <Link to={`/update-todo-list/${todolist._id}`}>
  //               <button disabled={loading} className={"editTodoButton"}>Editar</button>
  //             </Link>
  //           </div>
  //         </div>
  //        )
  //       ))}
  //     </div>
  //   )}
  // }

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
    <ShowTodolistStyle>
      <ButtonGlobalStyle />
      <div className={"todolistMenu"}>
        <h1>Suas tarefas</h1>
        <div  hidden>
        {userTodoslist.length > 0 && (
          <div className={"todolistFilter"}>
            <Link className={"linkButton"}>
              <button className={"todoButtonFiltertoDo"}>A fazer</button>
            </Link>
            <Link className={"linkButton"}>
              <button type="submit" className={"todoButtonFilterDo"}>Fazendo</button>
            </Link>
            <Link className={"linkButton"}>
              <button className={"todoButtonFilterDone"}>Feito</button>
            </Link>
          </div>
        )}
        </div>
        <div className="todolistButtons">
          <button onClick={handleShowTodoslist} className={"showButtonStyle"}>Mostrar tarefas</button>
          <Link to={"/create-todo-list"} >
            <button type="submit" className={"createTodoList"}>Criar tarefa</button>
          </Link>
        </div>
        <p>{ShowTodoslistError ? "Erro ao mostrar lista de tarefas" : ""}</p>
        {showTodoslist ? <p className={"qtddTasks"}>Você possui {userTodoslist.length} tarefas.</p> : ""}
      </div>
      {userTodoslist && userTodoslist.length > 0 && (
        <div className={"showTodosList"}>
          {userTodoslist.map((todolist) => (
            <div key={todolist._id} className={"showTodoLinks"}>
              <div className={"showTodo"}>
                <Link to={`/todolist/${todolist._id}`} className="showTodoLink" >
                  <li className={"showTodoLi"}>Título: {todolist.title}</li>
                </Link>
                <Link to={`/todolist/${todolist._id}`} className="showTodoLink" >
                  <li className={"showTodoLi"}>Descrição: {todolist.description}</li>
                </Link>
                <Link to={`/todolist/${todolist._id}`} className="showTodoLink" >
                  <li className={"showTodoLi"}>Status: {todolist.statusType}</li>
                </Link>
              </div>
              <div className={"todolistButtons"}>
                <button onClick={() => handleDeleteTodolist(todolist._id)} className={"deleteTodoButton"}>Excluir</button>
                <Link to={`/update-todo-list/${todolist._id}`}>
                  <button disabled={loading} className={"editTodoButton"}>Editar</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </ShowTodolistStyle>
  )
}
