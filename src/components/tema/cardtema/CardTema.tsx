import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div
      className="w-[360px] rounded-2xl p-6 shadow-lg flex flex-col gap-4"
      style={{ backgroundColor: '#f2b7cd' }}
    >
      <h2 className="text-3xl font-bold text-white text-center">
        Tema
      </h2>

      <div
        className="w-full rounded-lg p-4 text-white text-lg"
        style={{ backgroundColor: '#e8a9c3' }}
      >
        {tema.descricao}
      </div>

      <div className="flex gap-4 mt-2">
        <Link
          to={`/editartema/${tema.id}`}
          className="flex-1 py-2 rounded-lg text-white text-center font-semibold transition"
          style={{ backgroundColor: '#d776a2' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Editar
        </Link>

        <Link
          to={`/deletartema/${tema.id}`}
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

export default CardTema
