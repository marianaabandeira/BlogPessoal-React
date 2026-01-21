
import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";

function FormTema() {

const navigate = useNavigate();

const [tema, setTema] = useState<Tema>({} as Tema);
const [isLoading, setIsLoading] = useState<boolean>(false);

const { usuario, handleLogout } = useContext(AuthContext);
const token = usuario.token;

const { id } = useParams<{ id: string }>();

async function buscarPorId(id: string) {
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

useEffect(() => {
  if (token === "") {
    alert("Você precisa estar logado!");
    navigate("/");
  }
}, [token]);

useEffect(() => {
  if (id !== undefined) {
    buscarPorId(id);
  }
}, [id]);

function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
  setTema({
    ...tema,
    [e.target.name]: e.target.value,
  });
}

function retornar() {
  navigate("/temas");
}

async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsLoading(true);

  if (id !== undefined) {
    try {
      await atualizar("/temas", tema, setTema, {
        headers: { Authorization: token },
      });
      alert("O Tema foi atualizado com sucesso!");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao atualizar o tema.");
      }
    }
  } else {
    try {
      await cadastrar("/temas", tema, setTema, {
        headers: { Authorization: token },
      });
      alert("O Tema foi cadastrado com sucesso!");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao cadastrar o tema.");
      }
    }
  }

  setIsLoading(false);
  retornar();
}

    
  return (
    <div className="flex justify-center w-full my-8">
      <div
        className="w-[360px] rounded-2xl p-6 shadow-lg flex flex-col gap-6"
        style={{ backgroundColor: "#f2b7cd" }}
      >
        <h1 className="text-3xl font-bold text-white text-center">
          {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovoTema}>
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="text-white font-semibold">
              Descrição do Tema
            </label>
            <input
              type="text"
              placeholder="Descreva aqui seu tema"
              name="descricao"
              className="border rounded p-2 bg-transparent text-white placeholder:text-white outline-none focus:border-[#d776a2]"
            style={{ borderColor: "#d776a2" }}
                value={tema.descricao}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <button
            type="submit"
            className="py-3 rounded-lg text-white font-semibold transition flex justify-center items-center"
            style={{ backgroundColor: "#d776a2" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
             {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
            ) : (
                <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormTema;
