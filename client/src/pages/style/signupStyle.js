import styled from "styled-components";

export const SignupStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  h1 {
    padding: 20px;
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

  .signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .input {
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    width: 300px;
    background-color: var(--background-light);
    color: var(--text);
    font-size: 16px;
  }

  .signupButton {
    width: 300px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: var(--primary);
    color: var(--text);
    font-size: 16px;
  }

  .buttonCreateTodoList {
    width: 300px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: green;
    color: var(--text);
    font-size: 16px;
  }

  .toSignin {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .signinLink {
    color: var(--primary);
    font-weight: bold;
  }

  .deleteAccount {
    color: red;
    cursor: pointer;
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

  .todoList {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .todoStatus {
    display: flex;
    align-items: center;
    justify-content: center;
    gap:2px
  }
  

`