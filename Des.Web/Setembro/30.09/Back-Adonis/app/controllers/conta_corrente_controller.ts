import type { HttpContext } from '@adonisjs/core/http'
import { createContaCorrente, updateContaCorrente } from '#validators/conta_corrente'
import ContaCorrentePolicy from '#policies/conta_corrente_policy'
import ContaCorrenteService from '#services/conta_corrente_service'

export default class ContaCorrentesController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ContaCorrentePolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar contas correntes' })
      }

      const contas = await ContaCorrenteService.listarContas()
      return response.status(200).json({ message: 'OK', data: contas })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async create({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ContaCorrentePolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar contas correntes' })
      }

      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createContaCorrente)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ContaCorrentePolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar contas correntes' })
      }

      const conta = await ContaCorrenteService.criarConta(payload)
      return response.status(201).json({ message: 'OK', data: conta })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ContaCorrentePolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver conta corrente' })
      }

      const conta = await ContaCorrenteService.buscarConta(params.id)
      return response.status(200).json({ message: 'OK', data: conta })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async edit({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ContaCorrentePolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar contas correntes' })
      }

      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateContaCorrente)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ContaCorrentePolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar contas correntes' })
      }

      const conta = await ContaCorrenteService.atualizarConta(params.id, payload)
      return response.status(200).json({ message: 'OK', data: conta })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(ContaCorrentePolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover contas correntes' })
      }

      await ContaCorrenteService.deletarConta(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }
}
