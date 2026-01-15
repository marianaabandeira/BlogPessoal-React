import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-[#d776a2]">
        <form className="flex justify-center items-center flex-col w-1/2 gap-4 bg-[#e8a9c3] p-8 rounded-2xl shadow-lg">
          <h2 className="text-white text-5xl">Entrar</h2>

          <div className="flex flex-col w-full text-white">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="border-2 border-white rounded p-2 bg-white text-[#d776a2] placeholder:text-[#e8a9c3]"
            />
          </div>

          <div className="flex flex-col w-full text-white">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-white rounded p-2 bg-white text-[#d776a2] placeholder:text-[#e8a9c3]"
            />
          </div>

          <button
            type="submit"
            className="rounded text-white bg-[#d776a2] hover:bg-[#e8a9c3] w-1/2 py-2 flex justify-center"
          >
            <span>Entrar</span>
          </button>

          <hr className="border-white w-full" />

          <p className="text-white">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" className="text-white underline hover:text-[#d776a2]">
              Cadastre-se
            </Link>
          </p>
        </form>

        <div className="lg:block hidden w-full min-h-screen flex items-center justify-center">
          <img
            src="/src/assets/eu.png"
            alt="Ilustração de uma menina no computador"
            className="max-w-[600px] w-full h-auto object-contain mx-auto mt-26"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
