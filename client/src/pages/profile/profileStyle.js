import styled from "styled-components";

export const ProfileStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 50px;

  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
   gap: 12px;
   padding: 10px;
  }

  .avatar {
    border-radius: 100px;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  .avatarProfile {
    border-radius: 100px;
    width: 100px;
    height: 100px;
    cursor: pointer;
  }

  .profileForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .profileInput {
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    width: 300px;
    background-color: var(--background-light);
    color: var(--text);
    font-size: 16px;
  }

  .error, .progress, .success {
    text-align: start;
    padding: 10px;
    font-size: smaller;
  }

  .error {
    color: red;
  }

  .progress {
    color: blue;
  }

  .success {
    color: green;
  }

 .createButtonStyle {
    background-color: green;
  }

  .profileAside {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profileSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .todoLi {
    list-style: none;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--background-light);
    color: var(--text);
  }

  .showTodosList {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 50%;
    border-radius: 10px;
    width: fit-content
  }
  .showTodosList > h1 {
    text-align: center;
  }

  .showTodoLinks {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: var(--background-secundary);
    border-radius: 10px;
    margin: 20px;
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
`
