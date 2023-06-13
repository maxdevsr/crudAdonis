import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

    public async store({request, response}: HttpContextContract){
        const body =  request.only(['name', 'email', 'password'])
        const user = await User.create({name: body.name, email:body.email, password:body.password})
        
        return user
    }


}
