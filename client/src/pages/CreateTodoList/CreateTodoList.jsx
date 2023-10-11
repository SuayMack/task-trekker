import { SignupStyle } from "../style/signupStyle";

export default function CreateTodoList() {
  return (
    <SignupStyle>
      <h1>Create Todo List</h1>
      <div className={"form"}>
        <form className={"signup"}>
          <input type="text" id="title" placeholder="Título" maxLength='62' minLength='3' className={"input"} required />
          <textarea id="description" placeholder="Descrição" className={"input"} cols="30" rows="6"></textarea>
        
          <div className={"todoList"}>
            <div className={"todoStatus"}>
              <input type="radio" name="status" id="a fazer" value="a fazer" />
              <label htmlFor="a fazer">A fazer</label>
            </div>
            <div className={"todoStatus"}>
              <input type="radio" name="status" id="fazendo" value="fazendo" />
              <label htmlFor="fazendo">Fazendo</label>
            </div>
            <div className={"todoStatus"}>
              <input type="radio" name="status" id="feito" value="feito" />
              <label htmlFor="feito">Feito</label>
            </div>
          </div>        
          <button type="submit" className={"buttonCreateTodoList"}>Criar tarefa</button>   
        </form>
      </div>
    </SignupStyle>
  )
}
