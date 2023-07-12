import Route from '@ioc:Adonis/Core/Route'
Route.post('user', 'UsersController.index').middleware('auth')
Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.post('/update', 'UsersController.update')
})
  .prefix('/profile')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'ServicesController.getServices')
  Route.post('/create', 'ServicesController.postServices')
})
  .prefix('/services')
  .middleware('auth')

Route.group(() => {
  Route.post('/create', 'SubServicesController.createSubService')
  // Route.get('/:id', 'SubServicesController.getSubService')
  Route.get('/', 'SubServicesController.getAllSubServices')
})
  .prefix('/sub_services')
  .middleware('auth')

Route.group(() => {
  Route.post('/create', 'BooksController.createBook')
  Route.post('/confirm', 'BooksController.confirmBook')
})
  .prefix('/book')
  .middleware('auth')

Route.group(() => {
  Route.get('/:id', 'PaymentsController.getPayment')
  Route.post('/create', 'PaymentsController.createPayment')
})
  .prefix('/payment')
  .middleware('auth')
Route.post('login', 'UsersController.login')

Route.post('register', 'UsersController.register')
Route.post('create_profile', 'UsersController.createProfile')

Route.post('logout', 'UsersController.logout')
