import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import Produto from 'App/Models/Produto'

export default class CategoriasController {
    public async salvarCategoria({request, response}: HttpContextContract) {
        

        const body = request.body()
        const novaCategoria = await Categoria.create(body)
        response.status(201)
        
        return{
            message: 'Categoria criada com sucesso!',
            data: novaCategoria,
        }
    }

    public async todasCategorias() {
        const categoriasCadastradas = await Categoria.all()
        
        return {
            data: categoriasCadastradas,
        }
    }

    public async atualizarCategoria({ request, response }: HttpContextContract) {
        const { id, ...data } = request.body()
        const categoria = await Categoria.findOrFail(id)

        categoria.merge(data)
        await categoria.save()

        return {
            message: 'Categoria atualizada com sucesso!',
            data: categoria,
        }
    }

    public async produtosPorCategoria({ request }: HttpContextContract) {
        const {categoriaId} = request.body()

        const produtos = await Produto.query()
        .where('categoria_id', categoriaId)
        .preload('categoria')
        .exec()

        return {
            data: produtos,
        }
    }

  public async apagarCategoria({ request, response }: HttpContextContract) {
    const { id } = request.body()
    const categoria = await Categoria.findOrFail(id)

    await categoria.delete()

    return {
      message: 'Categoria apagada com sucesso!',
    }
  }
}
