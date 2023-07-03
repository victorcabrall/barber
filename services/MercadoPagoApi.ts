import { Exception } from '@adonisjs/core/build/standalone'
import axios from 'axios'

export const postPayment = async (
  amount: number,
  paymentMethod: string,
  email: string,
  id: string
) => {
  try {
    const body = {
      transaction_amount: amount,
      payment_method_id: paymentMethod,
      payer: {
        id: id,
        email: email,
      },
      description: '..',
    }
    const res = await axios.post('https://api.mercadopago.com/v1/payments/', body)
    if (res.status === 200) {
      return res.data
    }
    throw new Exception('message', res.status, 'Falhou na requisiçao ')
  } catch (e) {
    return e
  }
}

export const getPayment = async (id: number) => {
  try {
    const res = await axios.get('https://api.mercadopago.com/v1/payments/' + id)
    if (res.status === 200) {
      return res.data
    }
    throw new Exception('message', res.status, 'Falhou na requisçao')
  } catch (e) {
    return e
  }
}
