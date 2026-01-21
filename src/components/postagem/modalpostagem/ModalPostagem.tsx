import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button
            className="rounded-lg px-4 py-2 text-white font-semibold transition shadow-md"
            style={{ backgroundColor: '#e8a9c3' }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = '#d776a2')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = '#e8a9c3')
            }
          >
            Nova Postagem
          </button>
        }
        modal
        contentStyle={{
          borderRadius: '1rem',
          paddingBottom: '2rem',
        }}
      >
        <FormPostagem />
      </Popup>
    </>
  );
}

export default ModalPostagem;
