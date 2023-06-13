import { useState, useEffect } from "react";
import api from "../../api/index.js";

function Produtos({produtosFiltrados, categorias }) {
  const [produtos, setProdutos] = useState(produtosFiltrados as any);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    categoriaId: null,
    tamanhoId: null,
    quantidade: 0,
    valor: 0.0,
    descricao: "",
  });
  const [editandoProdutoId, setEditandoProdutoId] = useState(null);
  const [editandoProduto, setEditandoProduto] = useState({
    id: null,
    nome: "",
    categoriaId: null,
    tamanhoId: null,
    quantidade: 0,
    valor: 0.0,
    descricao: "",
  });

  const fetchProdutos = async () => {
    try {
      const { data } = await api.get("produtos/todosProdutos");
      const produtosObj = data.data.reduce((obj, produto) => {
        obj[produto.id] = produto;
        return obj;
      }, {});
      setProdutos(produtosObj);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  async function salvarProduto() {
    try {
      const { data } = await api.post("produtos/salvarProduto", novoProduto);
      console.log("Novo produto:", data);
      setProdutos((prevProdutos) => ({
        ...prevProdutos,
        [data.data.id]: data.data,
      }));
      setNovoProduto({
        nome: "",
        categoriaId: null,
        tamanhoId: null,
        quantidade: 0,
        valor: 0.0,
        descricao: "",
      });
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
    }
  }

  async function editarProduto(produtoId) {
    try {
      const produto = produtos[produtoId];
      const { data } = await api.put("produtos/atualizarProduto",editandoProduto);
      console.log("Produto atualizado:", data);
      setProdutos((prevProdutos) => ({
        ...prevProdutos,
        [produto.id]: { ...produto, ...editandoProduto },
      }));
      setEditandoProdutoId(null);
      setEditandoProduto({
        id: null,
        nome: "",
        categoriaId: null,
        tamanhoId: null,
        quantidade: 0,
        valor: 0.0,
        descricao: "",
      });
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  }

  function cancelarEdicao() {
    setEditandoProdutoId(null);
    setEditandoProduto({
      id: null,
      nome: "",
      categoriaId: null,
      tamanhoId: null,
      quantidade: 0,
      valor: 0.0,
      descricao: "",
    });
  }

  async function excluirProdutoId(id) {
    try {
      await api.delete("produtos/apagarProduto", { data: { id } });
      console.log("Produto excluído com sucesso!");
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  }

  return (
    <div >
      <div style={{display: "flex", flexDirection: "column", gap:'0.5rem'}}>
        <h3>Nome do produto</h3>
        <input value={novoProduto.nome || ""} onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value }) }/>
        <h3>Categoria do produto</h3>
        <select
          value={novoProduto.categoriaId || ""}
          onChange={(e) => setNovoProduto({ ...novoProduto, categoriaId: e.target.value })}>
          <option value="">Selecione uma categoria</option>
          {Object.values(categorias).map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <h3>Quantidade do produto</h3>
        <input value={novoProduto.quantidade || ""} type="number"
          onChange={(e) => setNovoProduto({ ...novoProduto, quantidade: e.target.value })}/>
        <h3>Valor do produto</h3>
        <input
          type="text"
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, valor: e.target.value })
          }
        />
        <h3>Descrição do produto</h3>
        <textarea value={novoProduto.descricao || ""}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, descricao: e.target.value })
          }></textarea>
        <button onClick={salvarProduto}>salvar</button>
      </div>
      <div>
        {Object.values(produtos).map((produto) => (
          <div style={{display:'flex', flexDirection:'row', gap:'0.5px', width:'50%' }} key={produto.id}>
            {editandoProdutoId === produto.id ? (
              <>
                <input value={editandoProduto.nome || ""}
                  onChange={(e) => setEditandoProduto({...editandoProduto, nome: e.target.value, })}/>
                <select value={editandoProduto.categoriaId || ""} 
                    onChange={(e) => setEditandoProduto({...editandoProduto,categoriaId: e.target.value,})}>
                  <option value="">Selecione uma categoria</option>
                  {Object.values(categorias).map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
                <input value={editandoProduto.quantidade || ""} type="number"
                  onChange={(e) => setEditandoProduto({...editandoProduto, quantidade: e.target.value})}/>
                <input value={editandoProduto.valor || ""} type="number"
                  onChange={(e) => setEditandoProduto({...editandoProduto,valor: e.target.value})}/>
                <textarea value={editandoProduto.descricao || ""} onChange={(e) =>
                    setEditandoProduto({
                      ...editandoProduto,
                      descricao: e.target.value,
                    })}></textarea>
                <button onClick={() => editarProduto(produto.id)}>
                  salvar
                </button>
                <button onClick={cancelarEdicao}>cancelar</button>
              </>
            ) : (
              <div style={{display:'flex', flexDirection:'column', gap:'0.5px'}}>
                <p>{produto.nome}</p>
                {/* <p>Categoria: {categorias[produto.categoriaId]?.nome}</p> */}
                <p>Quantidade: {produto.quantidade}</p>
                <p>Valor: {produto.valor}</p>
                <p>Descrição: {produto.descricao}</p>
                <button
                  onClick={() => {
                    setEditandoProdutoId(produto.id);
                    setEditandoProduto({
                      id: produto.id,
                      nome: produto.nome,
                      categoriaId: produto.categoriaId,
                      tamanhoId: produto.tamanhoId,
                      quantidade: produto.quantidade,
                      valor: produto.valor,
                      descricao: produto.descricao,
                    });
                  }}
                >
                  Editar
                </button>
                <button onClick={() => excluirProdutoId(produto.id)}>
                  Excluir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produtos;
