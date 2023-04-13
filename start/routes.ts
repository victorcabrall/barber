import Route from '@ioc:Adonis/Core/Route'
Route.post('user', 'UsersController.index').middleware('auth')
Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.post('/update', 'UsersController.update')
})
  .prefix('/profile')
  .middleware('auth')
Route.post('login', 'UsersController.login')

Route.post('register', 'UsersController.register')

Route.post('logout', 'UsersController.logout')
