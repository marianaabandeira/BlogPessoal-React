import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"

function DeletarTema() {
  const navigate = useNavigate()

  const [tema, setTema] = useState<Tema>({} as Tema)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout()
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) buscarPorId(id)
  }, [id])

  async function deletarTema() {
    setIsLoading(true)
    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token }
      })
      alert("Tema apagado com sucesso")
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout()
      else alert("Erro ao deletar o tema.")
    }
    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/temas")
  }

  return (
    <div className="flex justify-center w-full my-8">
      <div
        className="w-[360px] rounded-2xl p-6 shadow-lg flex flex-col gap-4"
        style={{ backgroundColor: "#f2b7cd" }}
      >
        <h2 className="text-3xl font-bold text-white text-center">
          Deletar Tema
        </h2>

        <p className="text-white text-center font-semibold">
          Você tem certeza de que deseja apagar o tema a seguir?
        </p>

        <div
          className="w-full rounded-lg p-4 text-white text-center text-xl font-semibold"
          style={{ backgroundColor: "#e8a9c3" }}
        >
          {tema.descricao}
        </div>

        <div className="flex gap-4 mt-2">
          {/* SIM */}
          <button
            onClick={deletarTema}
            className="flex-1 py-2 rounded-lg text-white font-semibold transition flex justify-center items-center"
            style={{ backgroundColor: "#d776a2" }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = "#e8a9c3")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = "#d776a2")
            }
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : "Sim"}
          </button>

          {/* NÃO */}
          <button
            onClick={retornar}
            className="flex-1 py-2 rounded-lg text-white font-semibold transition"
            style={{ backgroundColor: "#e8a9c3" }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = "#d776a2")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = "#e8a9c3")
            }
          >
            Não
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarTema
