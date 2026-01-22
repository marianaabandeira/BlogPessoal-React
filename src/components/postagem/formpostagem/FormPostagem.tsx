import {useState,useContext,useEffect,type ChangeEvent,type FormEvent} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import type Tema from "../../../models/Tema"
import { buscar, atualizar, cadastrar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"

function FormPostagem() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [temas, setTemas] = useState<Tema[]>([])
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" })
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const { id } = useParams<{ id: string }>()
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const config = {
    headers: {
      Authorization: token
    }
  } as any

  async function buscarPostagemPorId(id: string) {
    try {
      const resposta = await buscar(`/postagens/${id}`, config)
      setPostagem(resposta.data)
      setTema(resposta.data.tema)
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout()
    }
  }

  async function buscarTemas() {
    try {
      const resposta = await buscar("/temas", config)
      setTemas(resposta.data)
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
    buscarTemas()
    if (id !== undefined) buscarPostagemPorId(id)
  }, [id])

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: { id: tema.id } as Tema
    })
  }, [tema])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: { id: tema.id } as Tema,
      usuario: { id: usuario.id } as any
    })
  }

  function retornar() {
    navigate("/postagens")
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (id !== undefined) {
        await atualizar("/postagens", postagem, config)
        alert("Postagem atualizada com sucesso")
      } else {
        await cadastrar("/postagens", postagem, config)
        alert("Postagem cadastrada com sucesso")
      }
      retornar()
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout()
      else alert("Erro ao salvar a Postagem")
    } finally {
      setIsLoading(false)
    }
  }

  const carregandoTema = tema.id === 0

  return (
    <div
      className="mx-auto rounded-2xl p-6 shadow-lg flex flex-col gap-4 w-[360px]"
      style={{ backgroundColor: "#f2b7cd" }}
    >
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col gap-4" onSubmit={gerarNovaPostagem}>
        <div className="w-full rounded-lg p-4 text-white flex flex-col gap-2" style={{ backgroundColor: "#e8a9c3" }}>
          <label className="font-semibold">Título da Postagem</label>
          <input
            type="text"
            name="titulo"
            required
            className="rounded p-2 bg-[#f2b7cd] text-white outline-none"
            value={postagem.titulo || ""}
            onChange={atualizarEstado}
          />
        </div>

        <div className="w-full rounded-lg p-4 text-white flex flex-col gap-2" style={{ backgroundColor: "#e8a9c3" }}>
          <label className="font-semibold">Texto da Postagem</label>
          <input
            type="text"
            name="texto"
            required
            className="rounded p-2 bg-[#f2b7cd] text-white outline-none"
            value={postagem.texto || ""}
            onChange={atualizarEstado}
          />
        </div>

        <div className="w-full rounded-lg p-4 text-white flex flex-col gap-2" style={{ backgroundColor: "#e8a9c3" }}>
          <p className="font-semibold">Tema da Postagem</p>

          <select
            className="rounded p-2 bg-[#f2b7cd] text-white outline-none"
            value={tema.id || ""}
            onChange={(e) => {
              const temaSelecionado = temas.find(
                (t) => t.id === Number(e.target.value)
              )
              if (temaSelecionado) setTema(temaSelecionado)
            }}
          >
            <option value="" disabled>
              Selecione um Tema
            </option>

            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-lg text-white font-semibold py-2 flex justify-center items-center"
          style={{ backgroundColor: "#d776a2" }}
          disabled={carregandoTema}
        >
          {isLoading ? <ClipLoader size={24} color="#ffffff" /> : "Salvar"}
        </button>
      </form>
    </div>
  )
}

export default FormPostagem
