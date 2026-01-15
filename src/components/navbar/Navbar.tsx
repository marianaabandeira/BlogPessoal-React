function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-2 bg-[#e8a9c3] text-white">
        <div className="w-full max-w-[1280px] flex justify-between text-lg px-8">
          <span>Blog Dev da Mari!</span>

          <div className="flex gap-4">
            Postagens
            Temas
            Cadastrar tema
            Perfil
            Sair
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
