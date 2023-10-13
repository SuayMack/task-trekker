import styled from "styled-components";

export const UpdateTodoListStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .form {
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

  .statusList {
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