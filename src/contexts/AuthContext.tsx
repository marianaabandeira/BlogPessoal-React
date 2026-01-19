import { createContext, type ReactNode, useEffect, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"

interface AuthContextProps {
  usuario: UsuarioLogin
  handleLogout(): void
  handleLogin(usuario: UsuarioLogin): Promise<void>
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  // 🔹 Recupera token ao abrir a aplicação
  useEffect(() => {
    const tokenSalvo = localStorage.getItem("token")
    if (tokenSalvo) {
      setUsuario({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: tokenSalvo
      })
    }
  }, [])

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true)
    try {
      await login("/usuarios/logar", usuarioLogin, (resposta: UsuarioLogin) => {
        setUsuario(resposta)
        localStorage.setItem("token", resposta.token) // 🔹 salva token
      })
      alert("O Usuário foi autenticado com sucesso!")
    } catch (error) {
      alert("Os Dados do usuário estão inconsistentes!")
    }
    setIsLoading(false)
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: ""
    })
    localStorage.removeItem("token") // 🔹 apaga token
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
