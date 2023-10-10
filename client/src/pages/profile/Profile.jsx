import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

import { app } from './../../firebase';
import { SignupStyle } from './../SignUp/signupStyle'

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  }

  return (
    <SignupStyle>
      <h1>Perfil</h1>
      <form className={"signup"}>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} accept="image/*" hidden />
        <img src={formData.avatar || currentUser.avatar} alt="perfil" className={"avatarProfile"} onClick={() => fileRef.current.click()} />
        <p>
          {fileUploadError ? (
            <span className={"error"}>Erro ao carregar a imagem (a imagem deve ter até 2Mb).</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className={"progress"}>Carregando... {filePerc}%</span>
            ) : filePerc === 100 ? (<span className={"success"}>Imagem carregada com sucesso</span>) : ""
          }
        </p>
        <input type="text" placeholder="Username" id="username" className={"input"} />
        <input type="email" placeholder="Email" id="email" className={"input"} />
        <input type="password" name="password" placeholder="Senha" id="password" className={"input"} />
        <button type="submit" className={"signupButton"}>Atualizar</button>
      </form>
      <div className="toSignin">
        <span className={"deleteAccount"}>Deletar conta</span>
        <span className={"signinLink"}>Sair</span>
      </div>
    </SignupStyle>
  )
}
