import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CreateTodoListStyle } from './CreateTodoStyle'
import { ButtonGlobalStyle } from '../../style/buttonStyle.js'

export default function CreateTodoList() {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    statusType: "a_fazer",
    userRef: currentUser._id
  })

  const  [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  
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
      const res = await fetch('/api/todolist/create', {
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
      navigate(`/`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <CreateTodoListStyle>
      <ButtonGlobalStyle />
      <h1>Create Todo List</h1>
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
          <button type="submit" className={"createListButtonStyle"}>{loading ? "Carregando..." : "Criar tarefa"}</button>   
          {error && <p className={"error"}>{error}</p>}
        </form>
      </div>
    </CreateTodoListStyle>
  )
}
