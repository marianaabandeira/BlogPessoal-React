import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/postagens", postagem, setPostagem, {
          headers: { Authorization: token },
        });
        alert("Postagem atualizada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) handleLogout();
        else alert("Erro ao atualizar a Postagem");
      }
    } else {
      try {
        await cadastrar("/postagens", postagem, setPostagem, {
          headers: { Authorization: token },
        });
        alert("Postagem cadastrada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) handleLogout();
        else alert("Erro ao cadastrar a Postagem");
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div
      className="mx-auto rounded-2xl p-6 shadow-lg flex flex-col gap-4 w-[360px]"
      style={{ backgroundColor: "#f2b7cd" }}
    >
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col gap-4" onSubmit={gerarNovaPostagem}>
        {/* Título */}
        <div className="w-full rounded-lg p-4 text-white flex flex-col gap-2" style={{ backgroundColor: "#e8a9c3" }}>
          <label htmlFor="titulo" className="font-semibold">Título da Postagem</label>
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            required
            className="rounded p-2 bg-[#f2b7cd] text-white placeholder:text-white/70 outline-none border-0"
            value={postagem.titulo}
            onChange={atualizarEstado}
          />
        </div>

        {/* Texto */}
        <div className="w-full rounded-lg p-4 text-white flex flex-col gap-2" style={{ backgroundColor: "#e8a9c3" }}>
          <label htmlFor="texto" className="font-semibold">Texto da Postagem</label>
          <input
            type="text"
            name="texto"
            placeholder="Texto"
            required
            className="rounded p-2 bg-[#f2b7cd] text-white placeholder:text-white/70 outline-none border-0"
            value={postagem.texto}
            onChange={atualizarEstado}
          />
        </div>

        {/* Tema */}
        <div className="w-full rounded-lg p-4 text-white flex flex-col gap-2" style={{ backgroundColor: "#e8a9c3" }}>
          <p className="font-semibold">Tema da Postagem</p>
          <select
            id="tema"
            className="rounded p-2 bg-[#f2b7cd] text-white outline-none border-0"
            onChange={(e) => buscarTemaPorId(e.target.value)}
          >
            <option value="" disabled>Selecione um Tema</option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="rounded-lg text-white font-semibold py-2 transition flex justify-center items-center"
          style={{ backgroundColor: "#d776a2" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          disabled={carregandoTema}
        >
          {isLoading ? (
            <ClipLoader size={24} color="#ffffff" />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
