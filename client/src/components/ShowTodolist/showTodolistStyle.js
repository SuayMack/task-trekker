import styled from "styled-components";

export const ShowTodolistStyle = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 20px;

  h1 {
    text-align: center;
  }

  .todolistMenu {
    display: flex;
    flex-direction: column;
    width: 30%;
  }

  .todolistFilter {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .todolistFilter button {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: none;
    outline: none;
    color: var(--text);
    text-align: center;
    font-size: 16px;
  }

  .linkButton {
    width: 90%;
    padding: 5px;
    border-radius: 10px;
    border: none;
    outline: none;
    color: var(--text);
    text-align: center;
    font-size: 16px;
  }

  .todoButtonFilterAll,.todoButtonFilterDo, .todoButtonFilterDone {
    border-radius: 10px;
    padding: 5px;
  }

  .todoButtonFilterAll {
    background-color: red;
  }
  .todoButtonFilterDo {
    background-color: orange;
  }
  .todoButtonFilterDone {
    background-color: green;
  }

  .todolistButtons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .createTodoList {
    background-color: green;
  }

  .todoLi {
    list-style: none;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--background-light);
    color: var(--text);
  }

  .showTodosList {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 10px;
    max-width:70%;
  }

  .showTodoLink {
    pointer-events: none;
  }

  .showTodoLinks {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: var(--background-secundary);
    border-radius: 10px;
    margin: 20px;
    max-width: 280px;
  }

  .showTodo {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
  }

  li.showTodoLi {
    color: var(--text);
    padding: 10px;

  }

  li.showTodoLi:hover {
    background: var(--caption);
  }

  .profileLinkButton {
    padding: 10px;
  }

  .todolistButtons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .deleteTodoButton, .editTodoButton {
    width: fit-content;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;     
  }

  .deleteTodoButton{
    color: red;
  }

  .editTodoButton {
    color: green;
  }

  .qtddTasks {
    padding: 10px;
    color: green;

  }

`