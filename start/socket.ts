import { getPayment } from '../services/MercadoPagoApi'
import Ws from '../app/Socket/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {
  let intervalId

  socket.on('payment', (data) => {
    console.log('Testando')

    intervalId = setInterval(async () => {
      const resPayment = await getPayment(data)
      console.log(data)
      if (resPayment && resPayment.status === 'approved') {
        socket.emit('payment:status', { status: resPayment.status })
        clearInterval(intervalId)
        socket.disconnect() // Limpa o intervalo após o pagamento ser aprovado
      } else if (resPayment && resPayment.status === 'pending') {
        socket.emit('payment:status', { status: resPayment.status })
        clearInterval(intervalId)
      } else if (resPayment && resPayment.status === 'cancelled') {
        socket.emit('payment:status', { status: resPayment.status })
        clearInterval(intervalId)
        socket.disconnect() // Limpa o intervalo após o pagamento ser aprovado
      }
    }, 8000) // Intervalo de 5 segundos
  })
  socket.on('disconnect', () => {
    clearInterval(intervalId) // Limpa o intervalo quando o socket é desconectado
  })
})
