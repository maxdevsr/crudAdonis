import Server from '@ioc:Adonis/Core/Server'
import AuthMiddleware from 'App/Middleware/Auth'


/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])

const globalMiddleware = [
  'Adonis/Middleware/AuthInit',
]

const namedMiddleware = {
  auth: 'Adonis/Addons/Auth',
}

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pairs. The value is the namespace
| or middleware function, and the key is the alias. Later, you can use these
| aliases on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows:
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth')
})
export { globalMiddleware }
