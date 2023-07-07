import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import BookService from 'App/Models/BookService'
import Payment from 'App/Models/Payment'

export default class BooksController {
  public async createBook({ auth, request, response }: HttpContextContract) {
    const { date, servicesIds } = request.body()
    try {
      if (!request.body()) {
        return response.badRequest({ success: false })
      }

      const book = await Book.create({
        date: date,
        userId: auth.user?.id,
        confirmed: false,
      })

      for (let i = 0; i < servicesIds.length; i++) {
        await BookService.create({
          bookId: book.id,
          serviceId: servicesIds[i],
        })
      }

      return response.ok({ success: true, message: 'Agendamento salvo!' })
    } catch (e) {
      console.log(e)
      return response.badRequest({ success: false })
    }
  }
  public async confirmBook({ auth, request, response }: HttpContextContract) {
    const { bookId } = request.body()
    try {
      if (!bookId) {
        return response.badRequest({ success: false })
      }
      const payment = await Payment.findBy('bookId', bookId)
      if (!payment) {
        return response.unauthorized({ success: false, message: 'Pagamento nao foi criado' })
      }
      if (payment.status.toLocaleUpperCase() === 'APPROVED') {
        await Book.query().where('id', bookId).update({ confirmed: true })
        return response.ok({
          status: payment.status,
          success: true,
          message: 'Agendamento confirmado com sucesso',
        })
      } else if (payment.status.toLocaleUpperCase() === 'PENDING') {
        return response.ok({
          status: payment.status,
          success: false,
          message: 'Aguardando a confirmação do pagamento para prosseguir com o agendamento.',
        })
      } else if (payment.status.toLocaleUpperCase() === 'CANCELLED') {
        await Book.query().where('id', bookId).delete()
        return response.ok({
          status: payment.status,
          success: false,
          message: 'O agendamento não pôde ser confirmado devido ao cancelamento do pagamento',
        })
      }
    } catch (e) {
      return response.badRequest({ success: false })
    }
  }
}
