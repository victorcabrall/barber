import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment'
import { postPayment, getPayment } from 'services/MercadoPagoApi'
export default class PaymentsController {
  public async createPayment({ auth, request, response }: HttpContextContract) {
    const { amount, paymentMethod, bookId } = request.body()

    if (!amount || !paymentMethod) {
      return response.badRequest({ success: false, message: 'Body da requisiçao está invalida' })
    }

    try {
      if (!auth.user) {
        return response.badRequest({ success: false, message: 'Usuario retornando vazio' })
      }
      const paymentRes = await postPayment(amount, paymentMethod, auth.user.email, auth.user.id)
      const payment = await Payment.create({
        idTransaction: paymentRes['id'],
        amount: paymentRes['transaction_amount'],
        typePayment: paymentRes['payment_type_id'],
        bookId: bookId,
        status: paymentRes.status,
      })
      const qrCode = paymentRes['point_of_interaction']['transaction_data']['qr_code']

      const paymentData = {
        ...payment,
        transaction_data: qrCode,
      }
      return response.ok({ success: true, payment_data: paymentData })
    } catch (e) {
      return response.badRequest({ success: false })
    }
  }
  public async getPayment({ auth, request, response }: HttpContextContract) {
    const { id } = request.body()

    if (!id) {
      return response.badRequest({ success: false, message: 'Body da requisiçao está invalida' })
    }

    try {
      const payment = await Payment.findBy('id', id)
      if (!payment) {
        return response.badRequest({ success: false, message: 'Pagamento nao existe ' })
      }
      const paymentRes = await getPayment(payment.idTransaction)
      payment.status = paymentRes.status
      await payment.save()

      if (paymentRes.status === 'approved') {
        return response.ok({
          success: true,
          stauts: paymentRes.status,
          message: 'Pagamento aprovado!',
        })
      } else if (paymentRes.status === 'pending') {
        return response.ok({
          success: false,
          stauts: paymentRes.status,
          message: 'Pagamento pendente!',
        })
      } else if (paymentRes.status === 'cancelled') {
        return response.ok({
          success: false,
          stauts: paymentRes.status,
          message: 'Pagamento cancelado!',
        })
      }
    } catch (e) {
      return response.ok({ success: false })
    }
  }
}
