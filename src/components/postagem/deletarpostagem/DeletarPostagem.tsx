import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"

function DeletarPostagem() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  // 🔹 Header (correção mínima)
  const config = {
    headers: {
      Authorization: token
    }
  } as any

  async function buscarPorId(id: string) {
    try {
      const resposta = await buscar(`/postagens/${id}`, config)
      setPostagem(resposta.data)
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarPostagem() {
    setIsLoading(true)

    try {
      await deletar(`/postagens/${id}`, config)
      alert("Postagem apagada com sucesso")
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      } else {
        alert("Erro ao deletar a postagem.")
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/postagens")
  }

  return (
    <div className="flex justify-center w-full my-8">
      <div
        className="w-[360px] rounded-2xl p-6 shadow-lg flex flex-col gap-4"
        style={{ backgroundColor: "#f2b7cd" }}
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Deletar Postagem
        </h1>

        <p className="text-white text-center font-semibold">
          Você tem certeza de que deseja apagar a postagem a seguir?
        </p>

        <div
          className="w-full rounded-lg p-4 text-white flex flex-col gap-2"
          style={{ backgroundColor: "#e8a9c3" }}
        >
          <p className="text-lg font-semibold">{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>

        <div className="flex gap-4 mt-2">
          {/* SIM */}
          <button
            className="flex-1 py-2 rounded-lg text-white font-semibold transition flex items-center justify-center"
            style={{ backgroundColor: "#d776a2" }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = "#e8a9c3")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = "#d776a2")
            }
            onClick={deletarPostagem}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>

          {/* NÃO */}
          <button
            className="flex-1 py-2 rounded-lg text-white font-semibold transition"
            style={{ backgroundColor: "#e8a9c3" }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = "#d776a2")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = "#e8a9c3")
            }
            onClick={retornar}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem
