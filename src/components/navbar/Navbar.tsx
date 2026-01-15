import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-[#e8a9c3] text-white">
        <div className="container flex justify-between text-lg mx-8">
          <Link to='/home' className="text-2xl font-bold">
            Blog Dev da Mari!
          </Link>

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
  );
}

export default Navbar;
