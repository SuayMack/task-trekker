import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateTodoListStyle } from './UpdateTodolist';

import { ButtonGlobalStyle } from '../../style/buttonStyle';
import { errorHandler } from '../../../../api/utils/error';
export default function UpdateTodoList() {
  const navigate = useNavigate()
  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    statusType: "",
    userRef: currentUser._id
  })
  const  [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
 
  useEffect (() => {
    const fetchTodolist = async () => {
      const todolistId = params.todolistId
      const res = await fetch(`/api/todolist/get/${todolistId}`)
      const data = await res.json()
      if(data.success === false){
        console.log(errorHandler(404, 'Erro ao buscar a lista de tarefas!'))
      }
      setFormData(data)
    }
    fetchTodolist()
  }, [])

  const handleChange = (e) => {
    if(e.target.id === 'title'){
      setFormData({...formData, title: e.target.value})
    }
    if(e.target.id === 'description'){
      setFormData({...formData, description: e.target.value})
    }
    if(e.target.id === 'a_fazer' || e.target.id === 'fazendo' || e.target.id === 'feito'){
      setFormData({...formData, statusType: e.target.id})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch(`/api/todolist/update/${params.todolistId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      })
      const data = await res.json()
      setLoading(false)
      if(data.success === false){
        setError(data.message)
      }
      navigate("/")
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <UpdateTodoListStyle>
      <ButtonGlobalStyle />
      <h1>Atualizar tarefa</h1>
      <div>
        <form onSubmit={handleSubmit} className={"form"}>
          <input onChange={handleChange} value={formData.title} type="text" id="title" placeholder="Título" maxLength='62' minLength='3' className={"input"} required />
          <textarea onChange={handleChange} value={formData.description} id="description" placeholder="Descrição" className={"input"} cols="30" rows="6"></textarea>
          <div className={"statusTypeList"}>
            <div className={"todoStatus"}>
              <input type="radio" id="a_fazer" onChange={handleChange} checked={formData.statusType === "a_fazer"} />
              <label htmlFor="a_fazer">A fazer</label>
            </div>
            <div className={"todoStatus"}>
              <input type="radio" id="fazendo" onChange={handleChange} checked={formData.statusType === "fazendo"} />
              <label htmlFor="fazendo">Fazendo</label>
            </div>
            <div className={"todoStatus"}>
              <input type="radio" id="feito" onChange={handleChange} checked={formData.statusType === "feito"} />
              <label htmlFor="feito">Feito</label>
            </div>
          </div>        
          <button className={"updateListButtonStyle"}>{loading ? "Carregando..." : "Atualizar tarefa"}</button>   
          {error && <p className={"error"}>{error}</p>}
        </form>
      </div>
    </UpdateTodoListStyle>
  )
}
