import { useEffect, useState } from "react";
import Categorias from "../categorias";
import Produtos from "../produtos";

function Home() {
    const [nome, setNome] = useState<string>('')

    useEffect(() => {
       const nomeDinamico = localStorage.getItem('nome')
       if (nomeDinamico) {
           const nomeCapitalizado = nomeDinamico.charAt(0).toUpperCase() + nomeDinamico.slice(1);
           setNome(nomeCapitalizado);
       }
    },[])

  return (
    <div>
        <h1>Bem-vindo à Gestão de produtos {nome}</h1>
        <div>
            <h3>Crie uma categoria de produtos ou edite as existentes</h3>
            <Categorias />
        </div>
    </div>
  );
}
export default Home