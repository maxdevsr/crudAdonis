import { useState, useEffect } from "react";
import api from "../../api/index.js";

function CategoriaFiltro({ exibePorCategoria, categorias }) {
  const [categoriasLista, setCategoriasLista] = useState([]);

  const fetchCategorias = async () => {
    try {
      const { data } = await api.get("categoria/todasCategorias");
      setCategoriasLista(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <ul style={{ display: 'flex', gap: '10px' }}>
      {categoriasLista.map((categoria) => (
        <li
          key={categoria.id}
          style={{ background: 'red', padding: '1rem', cursor: 'pointer' }}
          onClick={() => exibePorCategoria(categoria.id)}
        >
          {categoria.nome}
        </li>
      ))}
    </ul>
  );
}

export default CategoriaFiltro;
