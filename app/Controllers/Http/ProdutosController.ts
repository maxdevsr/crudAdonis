import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'

export default class ProdutosController {
  public async salvarProduto({ request, response }: HttpContextContract) {
    const body = request.body()
    const novoProduto = await Produto.create(body)
    response.status(201)

    return {
      message: 'Produto criado com sucesso!',
      data: novoProduto,
    }
  }

  public async todosProdutos() {
    const produtosCadastrados = await Produto.query()
      .preload('categoria')
      .preload('tamanho')
      .exec()

    return {
      data: produtosCadastrados,
    }
  }

  public async atualizarProduto({ request, response }: HttpContextContract) {
    const { id, ...data } = request.body()
    const produto = await Produto.findOrFail(id)

    produto.merge(data)
    await produto.save()

    return {
      message: 'Produto atualizado com sucesso!',
      data: produto,
    }
  }

  public async apagarProduto({ request, response }: HttpContextContract) {
    const { id } = request.body()
    const produto = await Produto.findOrFail(id)

    await produto.delete()

    return {
      message: 'Produto apagado com sucesso!',
    }
  }
}
