import styled from "styled-components"

export const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 25px;

  h1, p {
    color: var(--text);
  }

  form {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
  }

  .icon { 
    font-size: 30px;
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

  .calendarContainer {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
  }

  img {
    border-radius: 100px;
    width: 50px;
    height: 50px;
  }
`