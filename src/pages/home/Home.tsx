function Home() {
  return (
    <>
      <div className="bg-[#d776a2] flex justify-center min-h-[60vh]">
        <div className="container grid grid-cols-2 gap-24 items-center text-white max-w-[1280px]">
          
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <h2 className="text-5xl font-bold mb-12">
              Seja bem-vinda ao Blog Dev da Mari!
            </h2>

            <p className="text-xl mb-10">
              Onde tecnologia, ideias e vivências se encontram.
            </p>

            <div className="mt-6">
              <div className="rounded text-white border-white border-2 py-2 px-4">
                Nova Postagem
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <img
              src="https://media-public.canva.com/Q1TvM/MAFBmcQ1TvM/1/tl.png"
              alt="Imagem Página Home"
              className="w-2/3"
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
