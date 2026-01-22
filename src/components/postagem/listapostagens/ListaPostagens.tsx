import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";

function ListaPostagens() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // 🔹 Protege a rota
  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  // 🔹 Busca postagens apenas quando o token existir
  useEffect(() => {
    if (token !== "") {
      buscarPostagens();
    }
  }, [token]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);

      const resposta = await buscar("/postagens", {
        headers: {
          Authorization: token
        }
      });

      setPostagens(resposta.data);
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#d776a2" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-8">
        <div className="container mx-auto px-6 lg:px-16 flex flex-col">

          {!isLoading && postagens.length === 0 && (
            <span className="text-3xl text-center my-8 text-[#d776a2] font-bold">
              Nenhuma Postagem foi encontrada!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {postagens.map((postagem) => (
              <CardPostagem key={postagem.id} postagem={postagem} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default ListaPostagens;
