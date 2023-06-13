import { useState, useEffect } from "react";
import api from "../../api/index.js";

function CategoriaFiltro({ exibePorCategoria, categorias }) {
  return (
    <>
      <h3>Clique em qualquer categoria, e veja os produtos referentes a ela. Voce pode baixa-los em formato de PDF.</h3>
      <ul style={{ display: 'flex', gap: '10px' }}>
        {Object.values(categorias).map((categoria) => (
          <li
            key={categoria.id}
            style={{ background: 'gray', color:'white', borderRadius:'8px', padding: '1rem', cursor: 'pointer' }}
            onClick={() => exibePorCategoria(categoria.id)}
            >
            {categoria.nome}
          </li>
        ))}
      </ul>
      </>
  );
}

export default CategoriaFiltro;
