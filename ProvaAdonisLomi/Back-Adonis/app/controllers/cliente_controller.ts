import type { HttpContext } from '@adonisjs/core/http'
import ClienteService from '#services/cliente_service'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'
import Cliente from '#models/cliente'

export default class ClienteController {


  async index({ auth, response }: HttpContext) {
    const user = auth.user!

    try {
      const clientes = await ClienteService.listarParaUsuario(user)
      return response.status(200).json({ message: 'OK', data: clientes })
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar clientes', error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'nome_completo', 'email', 'senha', 'cpf', 'cidade',
      'estado', 'rua', 'numero_casa', 'saldo'
    ])

    const cliente = await ClienteService.criarCliente({
      ...payload,
      senha: await Hash.make(payload.senha),
    })

    await User.create({
      nome_completo: payload.nome_completo,
      email: payload.email,
      senha: await Hash.make(payload.senha),
      papel_id: 2,
      cliente_id: cliente.id,
    })

    return response.status(201).json({ message: 'OK', data: cliente })
  }

  async show({ params, response }: HttpContext) {
    const cliente = await Cliente.query()
      .where('id', params.id)
      .preload('contas')
      .firstOrFail()

    return response.ok({ data: cliente })
  }


  async update({ params, request, response }: HttpContext) {
    const payload = request.only([
      'nome_completo', 'email', 'senha', 'cpf', 'cidade',
      'estado', 'rua', 'numero_casa', 'saldo'
    ])

    const cliente = await ClienteService.atualizarCliente(params.id, payload)

    const user = await User.query().where('cliente_id', cliente.id).first()
    if (user) {
      user.merge({
        nome_completo: payload.nome_completo,
        email: payload.email,
        senha: payload.senha ? await Hash.make(payload.senha) : user.senha,
      })
      await user.save()
    }

    return response.status(200).json({ message: 'OK', data: cliente })
  }

  async destroy({ params, response }: HttpContext) {
    const cliente = await ClienteService.deletarCliente(params.id)

    const user = await User.query().where('cliente_id', cliente.id).first()
    if (user) {
      await user.delete()
    }

    return response.status(200).json({ message: 'OK', data: cliente })
  }


}



