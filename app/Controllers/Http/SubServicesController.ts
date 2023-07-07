import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'
import SubService from 'App/Models/SubService'

export default class SubServicesController {
  public async createSubService({ auth, request, response }: HttpContextContract) {
    const { serviceId, name, description, amount } = request.body()

    if (!serviceId || !name || !amount) {
      return response.badRequest({ success: false, message: 'Body da requisiçao está invalida' })
    }
    try {
      const service = await Service.findBy('id', serviceId)
      console.log(service)
      if (!service) {
        return response.badRequest({
          success: false,
          message: 'Não é possível criar um subserviço em um serviço inexistente',
        })
      }
      const subServices = await SubService.create({
        name,
        description: description ?? null,
        amount,
        serviceId,
      })

      return response.ok({
        success: true,
        message: 'Subserviço criando com sucesso!',
        data: subServices,
      })
    } catch (e) {
      return response.internalServerError({
        success: false,
        message: 'Ocorreu um erro interno no servidor',
      })
    }
  }

  public async getAllSubServices({ auth, request, response }: HttpContextContract) {
    const { serviceId } = request.params()
    if (!serviceId) {
      return response.badRequest({ success: false, message: 'Body da requisiçao está invalida' })
    }
    try {
      const subServices = await SubService.find('serviceId', serviceId)
      if (!subServices) {
        return response.notFound({ success: false, message: 'Sub serviço nao encontrado' })
      }
      return response.ok({ success: true, data: subServices })
    } catch (e) {
      return response.internalServerError({
        success: false,
        message: 'Ocurreu um erro interno no servidor',
      })
    }
  }

  public async getSubService({ auth, request, response }: HttpContextContract) {
    const { id } = request.params()
    if (!id) {
      return response.badRequest({ success: false, message: 'Body da requisiçao está invalida' })
    }
    try {
      const subServices = await SubService.findBy('id', id)
      if (!subServices) {
        return response.notFound({ success: false, message: 'Sub serviço nao encontrado' })
      }
      return response.ok({ success: true, data: subServices })
    } catch (e) {
      return response.internalServerError({
        success: false,
        message: 'Ocurreu um erro interno no servidor',
      })
    }
  }
}
