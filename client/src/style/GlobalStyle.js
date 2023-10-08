import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #646cff;
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
  }

  body {
    width: 100%;
    height: 100vh;
    min-height: 100vh;    
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: var(--background-primary);
    color: var(--text);
  }

  ol, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

`
