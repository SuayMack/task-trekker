import styled from "styled-components";

export const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .profileSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .profileForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
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

  .editarAvatarButton {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
  }

  .updateButtonStyle{
    background-color: #454ADE;
  }

  .deleteAccountButton {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background-color: red;
    opacity: 0.8;
    letter-spacing: 1px;
    margin-top: 10px;
    transition: 0.3s;
  }

  .updateButtonStyle:hover, .deleteAccountButton:hover {
    transform: scale(1.1)
  }

  .qtddTasks {
    padding: 10px;
    color: green;

  }
`
