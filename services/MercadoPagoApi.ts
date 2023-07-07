import { Exception } from '@adonisjs/core/build/standalone'
import axios from 'axios'

export const postPayment = async (
  amount: number,
  paymentMethod: string,
  email: string,
  id: string
) => {
  try {
    console.log('Ok')
    const body = {
      transaction_amount: amount,
      payment_method_id: paymentMethod,
      payer: {
        email: email,
      },
      description: '..',
    }
    const token: string = 'TEST-7252829721947771-031121-085f61556a3a21c66313cff34ea1d572-212652904'
    const res = await axios.post('https://api.mercadopago.com/v1/payments/', body, {
      headers: {
        'Content-type': 'Application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    if (res.status === 201) {
      return res.data
    }
    throw new Error('Falhou na requisiçao')
  } catch (e) {
    return e
  }
}

export const getPayment = async (id: number) => {
  try {
    const token: string = 'TEST-7252829721947771-031121-085f61556a3a21c66313cff34ea1d572-212652904'
    const res = await axios.get('https://api.mercadopago.com/v1/payments/' + id, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'Application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    if (res.status === 200) {
      console.log(res.data)
      return res.data
    }
    return res.data
    // throw new Exception('message', res.status, 'Falhou na requisçao')
  } catch (e) {
    return e
  }
}
