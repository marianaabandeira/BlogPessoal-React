import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"

// 👉 importa as imagens do assets
import fotoPerfil from "../../assets/Coding with style and joy.png"
import capaPerfil from "../../assets/0749963a6a5eea21d4a7a37ea9ecd130.jpg"

function Perfil() {
  const navigate = useNavigate()

  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado")
      navigate("/")
    }
  }, [usuario.token])

  return (
    <div className="flex justify-center mx-4">
      <div
        className="container mx-auto my-8 rounded-2xl overflow-hidden shadow-lg"
        style={{ backgroundColor: "#f2b7cd" }}
      >
        {/* Capa */}
        <img
          className="w-full h-72 object-cover border-b-8 border-white"
          src={capaPerfil}
          alt="Capa do Perfil"
        />

        {/* Foto */}
        <img
          className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
          src={fotoPerfil}
          alt={`Foto de perfil de ${usuario.nome}`}
        />

        {/* Infos */}
        <div
          className="relative mt-[-6rem] h-72 flex flex-col 
          text-white text-2xl items-center justify-center gap-2"
          style={{ backgroundColor: "#e8a9c3" }}
        >
          <p className="font-semibold">
            Nome: {usuario.nome}
          </p>
          <p>
            Email: {usuario.usuario}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Perfil
