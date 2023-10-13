import { createGlobalStyle } from "styled-components"

export const ButtonGlobalStyle = createGlobalStyle`
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    transition: 0.3s;
  }

  button:hover {
    opacity: 0.6;
  }

  .updateButtonStyle{
    background-color: #454ADE;
  }

  .createListButtonStyle, .updateListButtonStyle {
    background-color: green;
  }

  .showButtonStyle {
    margin-top: 10px;
    background-color: #2c3d55;
  }
`