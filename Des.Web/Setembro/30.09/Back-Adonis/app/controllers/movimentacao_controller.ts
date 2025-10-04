import type { HttpContext } from '@adonisjs/core/http'
import { createMovimentacao, updateMovimentacao } from '#validators/movimentacao'
import MovimentacaoPolicy from '#policies/movimentacao_policy'
import MovimentacaoService from '#services/movimentacao_service'
import logger from '@adonisjs/core/services/logger'

export default class MovimentacoesController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar movimentações' })
      }

      const movimentacoes = await MovimentacaoService.listarMovimentacao()
      return response.status(200).json({ message: 'OK', data: movimentacoes })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async create({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar movimentação' })
      }

      return response.status(200).json({ message: 'OK', data: [] })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createMovimentacao)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar movimentações' })
      }

      const movimentacao = await MovimentacaoService.criarMovimentacao(payload)
      return response.status(201).json({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      
      if (error.message === 'Saldo insuficiente') {
        return response.status(400).json({
          message: 'Saldo insuficiente para realizar a operação',
        })
      }
      
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver movimentação' })
      }

      const movimentacao = await MovimentacaoService.buscarMovimentacao(params.id)
      return response.status(200).json({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async edit({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar movimentação' })
      }

      return response.status(200).json({ message: 'OK', data: [] })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateMovimentacao)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar movimentação' })
      }

      const movimentacao = await MovimentacaoService.atualizarMovimentacao(params.id, payload)
      return response.status(200).json({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover movimentação' })
      }

      await MovimentacaoService.deletarMovimentacao(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }
}