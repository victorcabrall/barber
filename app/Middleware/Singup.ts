import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import type { GuardsList } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthMiddleware {
  protected async authenticate(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const { email } = request.body()

    if (!request.body()) {
      return response.unauthorized({ mensage: 'As credenciais de autenticação estão faltando' })
    }
    const user = await User.findBy('email', email)
    if (user) {
      return response.unauthorized({ mensage: 'Usuário já existe' })
    }
    try {
      await User.create({
        email: request.body().email,
        password: request.body().email,
        name: undefined,
        birth: undefined,
        gender: undefined,
        profileAvatar: undefined,
      })

      request.email = email
      return next()
    } catch (error) {
      console.log(error)
      return response.internalServerError({ error: error })
    }
  }
}
