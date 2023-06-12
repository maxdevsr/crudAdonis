/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import CategoriasController from 'App/Controllers/Http/CategoriasController'

Route.group(() => {
  Route.post('/salvarCategoria', 'CategoriasController.salvarCategoria')
  Route.get('/todasCategorias', 'CategoriasController.todasCategorias')
  Route.patch('/atualizarCategoria', 'CategoriasController.atualizarCategoria')
  Route.delete('/apagarCategoria', 'CategoriasController.apagarCategoria')
  Route.post('/produtosPorCategoria', 'CategoriasController.produtosPorCategoria')
}).prefix('/categoria')

Route.group(() => {
  Route.post('/salvarProduto', 'ProdutosController.salvarProduto')
  Route.get('/todosProdutos', 'ProdutosController.todosProdutos')
  Route.patch('/atualizarProduto', 'ProdutosController.atualizarProduto')
  Route.delete('/apagarProduto', 'ProdutosController.apagarProduto') 
}).prefix('/produtos')

Route.group(() => {
  Route.post('/salvarTamanho', 'TamanhosController.salvarTamanho')
  Route.get('/todosTamanhos', 'TamanhosController.todosTamanhos')
  Route.put('/atualizarTamanho', 'TamanhosController.atualizarTamanho')
  Route.delete('/apagarTamanho', 'TamanhosController.apagarTamanho')
  Route.post('/tamanhos/produtosPorTamanho', 'TamanhosController.produtosPorTamanho')
}).prefix('/tamanhos')