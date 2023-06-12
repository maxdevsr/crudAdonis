import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tamanho from 'App/Models/Tamanho'
import Produto from 'App/Models/Produto'

export default class TamanhosController {
  public async salvarTamanho({ request, response }: HttpContextContract) {
    const body = request.body()
    const novoTamanho = await Tamanho.create(body)
    response.status(201)

    return {
      message: 'Tamanho criado com sucesso!',
      data: novoTamanho,
    }
  }

  public async todosTamanhos() {
    const tamanhosCadastrados = await Tamanho.all()

    return {
      data: tamanhosCadastrados,
    }
  }

  public async atualizarTamanho({ request, response }: HttpContextContract) {
    const { id, ...data } = request.body()
    const tamanho = await Tamanho.findOrFail(id)

    tamanho.merge(data)
    await tamanho.save()

    return {
      message: 'Tamanho atualizado com sucesso!',
      data: tamanho,
    }
  }

  public async apagarTamanho({ request, response }: HttpContextContract) {
    const { id } = request.body()
    const tamanho = await Tamanho.findOrFail(id)

    await tamanho.delete()

    return {
      message: 'Tamanho apagado com sucesso!',
    }
  }

  public async produtosPorTamanho({ request }: HttpContextContract) {
    const { tamanhoId } = request.body()

    const produtos = await Produto.query()
      .whereHas('tamanho', (query) => {
        query.where('id', tamanhoId)
      })
      .preload('categoria')
      .preload('tamanho')
      .exec()

    return {
      data: produtos,
    }
  }
}
