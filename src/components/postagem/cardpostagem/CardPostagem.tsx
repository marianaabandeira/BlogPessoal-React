import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
  postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <div
      className="w-[360px] rounded-2xl p-6 shadow-lg flex flex-col gap-4"
      style={{ backgroundColor: '#f2b7cd' }}
    >
      <h2 className="text-3xl font-bold text-white text-center">
        Postagem
      </h2>

      {/* Bloco do título */}
      <div
        className="w-full rounded-lg p-4 text-white text-lg font-semibold"
        style={{ backgroundColor: '#e8a9c3' }}
      >
        {postagem.titulo}
      </div>

      {/* Bloco do conteúdo */}
      <div
        className="w-full rounded-lg p-4 text-white text-base flex flex-col gap-1"
        style={{ backgroundColor: '#e8a9c3' }}
      >
        <p>{postagem.texto}</p>
        <p>Tema: {postagem.tema?.descricao}</p>
        <p>
          Data:{' '}
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'full',
            timeStyle: 'medium',
          }).format(new Date(postagem.data))}
        </p>
        <p>Autor: {postagem.usuario?.nome}</p>
      </div>

      <div className="flex gap-4 mt-2">
        {/* EDITAR */}
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="flex-1 py-2 rounded-lg text-white text-center font-semibold transition"
          style={{ backgroundColor: '#d776a2' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Editar
        </Link>

        {/* DELETAR */}
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="flex-1 py-2 rounded-lg text-white text-center font-semibold transition"
          style={{ backgroundColor: '#e8a9c3' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d776a2')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#e8a9c3')}
        >
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardPostagem
