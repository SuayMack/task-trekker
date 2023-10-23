import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #454ADE;
    --background-primary: #2A2B2F;
    --background-secundary: #222327;
    --text: #D8DDDE;
    --caption: #8D8D99;
    --gray: #E1E1E6;
    --background-light: rgba(255, 255, 255, 0.05);
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
  }

  body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: var(--background-primary);
    color: var(--text);
    overflow-x: hidden;
  }

  ol, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    width: 300px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 16px;
  }

  li {
    list-style: none;
  }

`
