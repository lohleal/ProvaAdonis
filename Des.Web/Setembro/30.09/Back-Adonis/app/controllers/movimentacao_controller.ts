import type { HttpContext } from '@adonisjs/core/http'
import MovimentacaoService from '#services/movimentacao_service'
import logger from '@adonisjs/core/services/logger'

export default class MovimentacoesController {
  async index({ request, response }: HttpContext) {
    try {
      const resultado = await MovimentacaoService.listarMovimentacoes()
      return response.status(200).json({ message: 'OK', data: resultado })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const movimentacao = await MovimentacaoService.buscarMovimentacao(params.id)
      return response.status(200).json({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = request.only(['tipo', 'valor', 'conta_origem_id', 'conta_destino_id', 'descricao', 'data_movimentacao'])
      const movimentacao = await MovimentacaoService.criarMovimentacao(payload)
      return response.status(201).json({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      return response.status(400).json({ message: 'Erro ao criar movimentação', error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = request.only(['tipo', 'valor', 'conta_origem_id', 'conta_destino_id', 'descricao', 'data_movimentacao'])
      const movimentacao = await MovimentacaoService.atualizarMovimentacao(params.id, payload)
      return response.status(200).json({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      return response.status(400).json({ message: 'Erro ao atualizar movimentação', error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const movimentacao = await MovimentacaoService.deletarMovimentacao(params.id)
      return response.status(200).json({ message: 'Movimentação excluída com sucesso', data: movimentacao })
    } catch (error) {
      logger.error(error)
      return response.status(404).json({ message: 'Movimentação não encontrada', error: error.message })
    }
  }
}