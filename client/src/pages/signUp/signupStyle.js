import styled from "styled-components";

export const SignupStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    padding: 20px;
  }

  img {
    border-radius: 100px;
    width: 50px;
    height: 50px;
  }

  .signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
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

  .toSignin {
    width: 300px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .signinLink {
    color: var(--primary);
    font-weight: bold;
  }

  .deleteAccount {
    color: orange;
  }

  .error {
    color: red;
    text-align: start;
    padding: 10px;
  }
`