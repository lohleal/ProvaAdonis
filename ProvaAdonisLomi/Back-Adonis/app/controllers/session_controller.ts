import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {

   
    const { email, senha } = request.only(['email', 'senha'])
    const user = await User.verifyCredentials(email, senha)
    return await auth.use('api').createToken(user)
  }

  async destroy({ request, auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
  }
}