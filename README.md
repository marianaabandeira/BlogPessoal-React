# 📝 BlogPessoal — Front-end React + Backend em Render

Aplicação de blog pessoal desenvolvida com **React + TypeScript (Front-end)** e um **backend em Node.js/Express** hospedado no **Render**.  
Permite publicar, editar, listar e excluir postagens, autenticando usuários e consumindo uma **API REST real em produção**.

---

## 🔗 Links Importantes

- 🌐 **Aplicação em Produção (Front-end):** https://blog-pessoal-react-green.vercel.app/
- 🔙 **API REST / Swagger (Backend):** https://blogpessoal-zvr5.onrender.com
- 📁 **Código do Backend:** https://github.com/marianaabandeira/blog_pessoal

---

## 🎯 Objetivo do Projeto

Construir um **Blog Pessoal completo**, com **frontend em React** e **backend em produção**, permitindo ao usuário:

✔ Criar conta e realizar login  
✔ Listar todas as postagens  
✔ Criar novas postagens  
✔ Editar suas próprias postagens  
✔ Excluir postagens  
✔ Cadastrar, editar e excluir **Temas**  
✔ Associar **Postagens a Temas** (relacionamento entre entidades)  
✔ Navegar entre telas de forma fluida  

O projeto foi organizado com foco em **boas práticas de desenvolvimento**, **consumo de API REST**, **validações**, **organização de dados** e **responsividade básica**.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- Banco de dados: PostgreSQL
- ORM/ODM 

### Ferramentas
- Git & GitHub
- Deploy no Vercel (Front)
- Deploy no Render (Back)

---

## 🧩 Funcionalidades

### 🧠 Autenticação
- Cadastro de novos usuários
- Login com credenciais
- Armazenamento de token (JWT / localStorage)

### ✍️ Postagens
- Listar todas as postagens existentes
- Criar nova postagem
- Editar postagem feita pelo usuário
- Excluir postagem
- Associação de postagens a temas

### 🏷️ Temas
- Listar temas cadastrados
- Cadastrar novo tema
- Editar tema existente
- Excluir tema
- Relacionamento Tema ↔ Postagem (um tema pode possuir várias postagens)

### 🧭 Navegação
- Acesso às postagens, temas, cadastro de temas e perfil do usuário
- Listagem de postagens na página inicial
- Ação "Nova postagem" para criação de postagens
- Telas de edição de postagens
- Opção de logout do usuário
  
---

## 🧠 Conceitos Demonstrados

- Consumo de API REST com Axios
- Rotas públicas e privadas com React Router DOM
- Tratamento de formulários controlados
- Uso de hooks (`useState`, `useEffect`, `useNavigate`)
- Gerenciamento de estado local
- Separação de camadas (serviços/API)
- Deploy frontend e backend em produção

---

## 🧠 Como Executar o Projeto Localmente

### 📌 Front-end

```bash
# Clonar o repositório
git clone https://github.com/marianaabandeira/BlogPessoal-React.git

# Entrar na pasta
cd BlogPessoal-React

# Instalar dependências
npm install

# Rodar em modo dev
npm run dev
