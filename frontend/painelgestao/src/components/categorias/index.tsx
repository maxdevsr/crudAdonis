import { useState, useEffect } from "react";
import api from "../../api/index.js";
import Produtos from "../produtos/index.js";
import CategoriaFiltro from "../filtroCategorias/index.js";
import Modal from "../modal/index.js";

function Categorias() {
  const [categorias, setCategorias] = useState({});
  const [novaCategoria, setNovaCategoria] = useState("");
  const [editandoCategoriaId, setEditandoCategoriaId] = useState(null);
  const [editandoCategoriaNome, setEditandoCategoriaNome] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  const fetchCategorias = async () => {
    try {
      const { data } = await api.get("categoria/todasCategorias");
      const categoriasObj = data.data.reduce((obj: any, categoria: any) => {
        obj[categoria.id] = categoria;
        return obj;
      }, {});
      setCategorias(categoriasObj);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  async function salvarCategoria() {
    try {
      const { data } = await api.post("categoria/salvarCategoria", {
        nome: novaCategoria,
      });
      console.log("Nova categoria:", data);
      setCategorias((prevCategorias) => ({
        ...prevCategorias,
        [data.data.id]: data.data,
      }));
      setNovaCategoria("");
    } catch (error) {
      console.error("Erro ao salvar a categoria:", error);
    }
  }

  async function editarCategoria(categoriaId: any) {
    try {
      const categoria = categorias[categoriaId];
      const { data } = await api.put("categoria/atualizarCategoria", {
        id: categoria.id,
        nome: editandoCategoriaNome,
      });
      console.log("Categoria atualizada:", data);
      setCategorias((prevCategorias) => ({
        ...prevCategorias,
        [categoria.id]: { ...categoria, nome: editandoCategoriaNome },
      }));
      setEditandoCategoriaId(null);
      setEditandoCategoriaNome("");
    } catch (error) {
      console.error("Erro ao atualizar a categoria:", error);
    }
  }

  async function exibePorCategoria(id:number){
     try {
      const { data } = await api.post("categoria/produtosPorCategoria", {
        categoriaId: id,
      });
      setProdutosFiltrados(data.data);
      setModalAberto(true);
      console.log("produtos", produtosFiltrados);
    } catch (error) {
      console.error("Erro ao buscar", error);
    }
  }

  function cancelarEdicao() {
    setEditandoCategoriaId(null);
    setEditandoCategoriaNome("");
  }

async function excluirCategoriaId(id:number) {
  try {
    const res = await api.delete("categoria/apagarCategoria", { data: { id } });
    console.log(res.data);
  } catch (error) {
    console.error("Erro ao excluir a categoria:", error);
  } finally {
    fetchCategorias();
  }
}
  function fecharModal() {
    setModalAberto(false);
    setProdutosFiltrados([]);
  }

  return (
    <>
      <div style={{display: "flex",flexDirection: "row",alignItems: "center", justifyContent:'center', gap: "5px", border:'0.5px solid gray', borderRadius:'8px'}} >
        <input
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
        />
        <button onClick={salvarCategoria}>salvar</button>
      </div>
      <div>
        {Object.values(categorias).map((categoria) => (
          <div style={{display: "flex",flexDirection: "row",alignItems: "center", justifyContent:'center', gap: "5px", border:'0.5px solid gray', borderRadius:'8px'}} 
            key={categoria.id}>
            {editandoCategoriaId === categoria.id ? (
              <>
                <input
                  value={editandoCategoriaNome}
                  onChange={(e) => setEditandoCategoriaNome(e.target.value)}
                />
                <button onClick={() => editarCategoria(categoria.id)}>
                  salvar
                </button>
                <button onClick={cancelarEdicao}>cancelar</button>
              </>
            ) : (
              <>
                <p>{categoria.nome}</p>
                <button
                  onClick={() => {
                    setEditandoCategoriaId(categoria.id);
                    setEditandoCategoriaNome(categoria.nome);
                  }}
                >
                  Editar
                </button>
              <button onClick={() => {excluirCategoriaId(categoria.id); }}>
                  Excluir
                </button>
              </>
            )}
          </div>
        ))}
        <div>
            <h3>Crie um produto vinculado a uma categoria</h3>
            <Produtos produtosFiltrados={produtosFiltrados} categorias={categorias}/>
        </div>
            <CategoriaFiltro exibePorCategoria={exibePorCategoria} categorias={categorias}/>
             {modalAberto && <Modal produtos={produtosFiltrados} closeModal={fecharModal} />}
      </div>
    </>
  );
}

export default Categorias;
