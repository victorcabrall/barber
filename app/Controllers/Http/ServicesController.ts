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
  public async postServices({ auth, response }: HttpContextContract) {
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
}
