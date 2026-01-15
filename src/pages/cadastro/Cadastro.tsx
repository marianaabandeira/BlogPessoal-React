function Cadastro() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-[#d776a2]">
        
        {/* Imagem do lado esquerdo */}
        <div className="lg:block hidden w-full min-h-screen flex items-center justify-center">
          <img
            src="/src/assets/eu.png"
            alt="Ilustração de uma menina no computador"
            className="max-w-[600px] w-full h-auto object-contain mx-auto mt-27"
          />
        </div>

        {/* Formulário */}
        <form className="flex justify-center items-center flex-col w-2/3 gap-3 bg-[#e8a9c3] p-8 rounded-2xl shadow-lg">
          <h2 className="text-white text-5xl">Cadastrar</h2>

          <div className="flex flex-col w-full text-white">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-white rounded p-2 bg-white text-[#d776a2] placeholder:text-[#e8a9c3]"
            />
          </div>

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
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
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

          <div className="flex flex-col w-full text-white">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-white rounded p-2 bg-white text-[#d776a2] placeholder:text-[#e8a9c3]"
            />
          </div>

          <div className="flex justify-around w-full gap-8">
            <button
              type="reset"
              className="rounded text-white bg-[#d776a2] hover:bg-[#e8a9c3] w-1/2 py-2"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded text-white bg-[#d776a2] hover:bg-[#e8a9c3] w-1/2 py-2 flex justify-center"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
