import type { HttpContext } from '@adonisjs/core/http'
import { createCliente, updateCliente } from '#validators/cliente'
import ClientePolicy from '#policies/cliente_policy'
import ClienteService from '#services/cliente_service'
import logger from '@adonisjs/core/services/logger'

export default class ClienteController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ClientePolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar clientes' })
      }

      const clientes = await ClienteService.listarClientes()
      return response.status(200).json({ message: 'OK', data: clientes })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async create({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ClientePolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar cliente' })
      }

      return response.status(200).json({ message: 'OK', data: [] })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createCliente)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ClientePolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar clientes' })
      }

      const cliente = await ClienteService.criarCliente(payload)
      return response.status(201).json({ message: 'OK', data: cliente })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ClientePolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver cliente' })
      }

      const cliente = await ClienteService.buscarCliente(params.id)
      return response.status(200).json({ message: 'OK', data: cliente })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async edit({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ClientePolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar cliente' })
      }

      return response.status(200).json({ message: 'OK', data: [] })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateCliente)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ClientePolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar cliente' })
      }

      const cliente = await ClienteService.atualizarCliente(params.id, payload)
      return response.status(200).json({ message: 'OK', data: cliente })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ClientePolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover cliente' })
      }

      await ClienteService.deletarCliente(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }
}
