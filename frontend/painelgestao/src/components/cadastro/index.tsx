import { useState } from "react";
import api from "../../api/index.js";
import { Link } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
}

function Cadastro() {
  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });

  async function criarUser(user: User) {
    try {
      const { data } = await api.post("users/store", user);
      console.log(data);

    } catch (error) {
      console.error("Erro ao buscar", error);
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  return (
    <ul>
      <li style={{display:'flex', flexDirection: 'column', gap:'0.5px'}}>
        <span>Nome</span>
        <input type="text" placeholder="Insira seu nome" onChange={handleNameChange}/>
      </li>
      <li style={{display:'flex', flexDirection: 'column', gap:'0.5px'}}>
        <span>Email</span>
        <input type="email" placeholder="Insira seu email" onChange={handleEmailChange}/>
      </li>
      <li style={{display:'flex', flexDirection: 'column', gap:'0.5px'}}>
        <span>Senha</span>
        <input type="password" placeholder="Insira sua senha" onChange={handlePasswordChange}/>
      </li>
      <li style={{display:'flex', gap:'5px', marginTop:'10px'}}>
        <Link style={{border: '1px solid blue', padding:'10px'}} onClick={() => criarUser(user)}>Cadastrar</Link>
        <Link style={{border: '1px solid blue', padding:'10px'}} to='/login'>Login</Link>
      </li>
    </ul>
  );
}

export default Cadastro;
