import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class UsersController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body()
    const user = await User.findBy('email', email)
    console.log(email)
    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '30 mins' })
      return token
    } catch (error) {
      console.log(error)
      return response.unauthorized('Invalid credenciais')
    }
  }
  public async register({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body()
    if (!email && !password) {
      return response.unauthorized({ mensage: 'As credenciais de autenticação estão faltando' })
    }
    const user = await User.findBy('email', email)
    if (user) {
      return response.unauthorized({ mensage: 'Usuário já existe' })
    }
    try {
      await User.create({
        email: email,
        password: password,
      })
      return response.accepted({ mensage: 'Usuário criado com sucesso' })
    } catch (error) {
      return response.internalServerError({ error: error })
    }
  }
  public async user({ auth, response }: HttpContextContract) {
    const { id, email, password } = auth.user as User
    return response.ok({ id, email, password })
  }
}
