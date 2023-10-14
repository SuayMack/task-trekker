import styled from "styled-components"

export const HeaderStyle = styled.header`
    width: 100vw;
    position: relative;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px;

  h1, p {
    color: var(--text);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 15px;

  }

  form {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
  }

  .icon { 
    font-size: 45px;
  }

  .input {
    padding: 10px;
    border-radius: 10px;
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 20px;
  }
  
  .profileSiginButton {
    color: var(--primary);
    font-weight: bold;
  }

  img {
    border-radius: 100px;
    width: 50px;
    height: 50px;
  }
`