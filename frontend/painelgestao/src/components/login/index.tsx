import { useState } from "react";
import api from "../../api/index.js";
import { Link, useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

function Login({ setIsAuthenticated }: { setIsAuthenticated: Function }) {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const navigate = useNavigate();

  async function logarUser(user: User) {
    try {
      const { data } = await api.post("login", user);
      console.log(data);
      // Salvar o token no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("nome", data.name);
      
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Erro ao buscar", error);
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  return (
    <ul>
      <li style={{display:'flex', flexDirection: 'column', gap:'0.5px'}}>
        <span>Email</span>
        <input type="email" placeholder="Insira seu email" onChange={handleEmailChange} />
      </li>
      <li style={{display:'flex', flexDirection: 'column', gap:'0.5px'}}>
        <span>Senha</span>
        <input type="password" placeholder="Insira sua senha" onChange={handlePasswordChange} />
      </li>
      <li style={{display:'flex', gap:'5px', marginTop:'10px'}}>
        <Link  style={{border: '1px solid blue', padding:'10px'}} to="/signin">Cadastrar</Link>
        <Link style={{border: '1px solid blue', padding:'10px'}}  onClick={() => logarUser(user)}>Login</Link>
      </li>
    </ul>
  );
}

export default Login;
