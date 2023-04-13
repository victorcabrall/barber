import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'UsersController.login')

Route.post('register', 'UsersController.register')

Route.post('user', 'UsersController.user').middleware('auth')
