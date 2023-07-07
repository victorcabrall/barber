import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import User from '../../Models/User'
import axios from 'axios'
export default class UsersController {
  public async index({ auth, response }: HttpContextContract) {
    Event.emit('new:payment', { id: 1 })
    return response.ok(auth.user)
  }
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body()
    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Email incorreto. Verifique seu endereço de email e tente novamente.',
      })
    }
    try {
      const dataToken = await auth.use('api').attempt(email, password)
      return response.ok({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          password: user.password,
          name: user.name,
          birth: user.birth,
          gender: user.gender,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          token: dataToken.token,
        },
      })
    } catch (error) {
      console.log(error)
      return response.unauthorized({
        success: false,
        message: 'Senha inválida. Verifique se você digitou corretamente e tente novamente.',
      })
    }
  }
  public async register({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body()

    if (!request.body()) {
      return response.unauthorized({
        success: false,
        message: 'As credenciais de autenticação estão faltando',
      })
    }
    let user = await User.findBy('email', email)
    if (user) {
      return response.unauthorized({
        success: false,
        message:
          'E-mail já cadastrado. Se você já possui uma conta, faça login. Caso contrário, utilize um e-mail diferente para se cadastrar.',
      })
    }
    try {
      user = await User.create({
        email: email,
        password: password,
        name: '',
        birth: new Date(),
        gender: '',
      })
      const dataToken = await auth.use('api').attempt(email, password, { expiresIn: '30 mins' })
      return response.ok({
        success: true,
        user: {
          ...user['$original'],
          token: dataToken.token,
        },
      })
    } catch (error) {
      console.log(error)
      return response.internalServerError({ message: error })
    }
  }
  public async createProfile({ auth, request, response }: HttpContextContract) {
    const { id, name, birth, gender, profileAvatar } = request.body()

    if (!request.body()) {
      return response.unauthorized({ mensage: 'As credenciais de autenticação estão faltando' })
    }
    let user = await User.findBy('id', id)
    if (!user) {
      return response.unauthorized({ mensage: 'Usuário nao  existe' })
    }
    try {
      await User.query().where('id', id).update({
        name: name,
        birth: birth,
        gender: gender,
      })

      return user
    } catch (error) {
      console.log(error)
      return response.internalServerError({ error: error })
    }
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.ok({ message: 'token revogado' })
  }
}
