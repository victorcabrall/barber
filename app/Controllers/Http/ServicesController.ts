import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'

export default class ServicesController {
  public async getServices({ auth, response }: HttpContextContract) {
    try {
      const services = await Service.all()
      return response.ok({ success: true, data: services })
    } catch (e) {
      return response.internalServerError({
        success: false,
        message: 'Ocorreu um erro interno no servidor',
      })
    }
  }
  public async postServices({ auth, request, response }: HttpContextContract) {
    const { name, description } = request.body()
    if (!name) {
      return response.badRequest({ success: false, message: 'Body da requisiçao está invalida' })
    }
    try {
      const services = await Service.create({
        name,
        description,
      })
      return response.ok({ success: true, data: services })
    } catch (e) {
      return response.internalServerError({
        success: false,
        message: 'Ocorreu um erro interno no servidor',
      })
    }
  }
}
