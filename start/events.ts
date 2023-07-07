import Event from '@ioc:Adonis/Core/Event'

Event.on('new:payment', (payment) => {
  console.log(payment)
})
