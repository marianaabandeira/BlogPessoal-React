import { useNavigate } from "react-router-dom"
import { SyncLoader } from "react-spinners"
import CardTema from "../cardtema/CardTema"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { buscar } from "../../../services/Service"

function ListaTemas() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [temas, setTemas] = useState<Tema[]>([])

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  // 🔹 Protege a rota
  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!")
      navigate("/")
    }
  }, [token])

  // 🔹 Busca temas SOMENTE quando o token existir
  useEffect(() => {
    if (token !== "") {
      buscarTemas()
    }
  }, [token])

  async function buscarTemas() {
    try {
      setIsLoading(true)

      const resposta = await buscar("/temas", {
        headers: {
          Authorization: token
        }
      })

      setTemas(resposta.data)

    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col items-center">

          {isLoading && (
            <SyncLoader color="#e8a9c3" size={32} />
          )}

          {!isLoading && temas.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Tema foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default ListaTemas
