import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Categoria from 'App/Models/Categoria'
import Tamanho from 'App/Models/Tamanho'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public categoriaId: number

  @column()
  public tamanhoId: number

  @column()
  public quantidade: number

  @column()
  public valor: number

  @column()
  public descricao: string

  @belongsTo(() => Categoria, {
    foreignKey: 'categoriaId', 
  })
  public categoria: BelongsTo<typeof Categoria>

  @belongsTo(() => Tamanho, {
    foreignKey: 'tamanhoId',
  })
  
  public tamanho: BelongsTo<typeof Tamanho>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}