import axios from "axios";

const api = axios.create({
  baseURL: "https://blogpessoal-zvr5.onrender.com"
});

// 🔹 LOGIN
export const login = async (url: string, dados: object) => {
  return await api.post(url, dados);
};

// 🔹 CADASTRAR USUÁRIO
export const cadastrarUsuario = async (url: string, dados: object) => {
  return await api.post(url, dados);
};

// 🔹 BUSCAR (GET)
export const buscar = async (url: string, header: object) => {
  return await api.get(url, header);
};

// 🔹 CADASTRAR (POST com token)
export const cadastrar = async (url: string, dados: object, header: object) => {
  return await api.post(url, dados, header);
};

// 🔹 ATUALIZAR (PUT)
export const atualizar = async (url: string, dados: object, header: object) => {
  return await api.put(url, dados, header);
};

// 🔹 DELETAR (DELETE)
export const deletar = async (url: string, header: object) => {
  return await api.delete(url, header);
};
