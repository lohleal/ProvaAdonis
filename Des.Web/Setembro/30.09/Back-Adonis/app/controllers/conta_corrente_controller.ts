import type { HttpContext } from '@adonisjs/core/http'
import ContaCorrenteService from '#services/conta_corrente_service'

export default class ContaCorrenteController {
  async index({ response }: HttpContext) {
    try {
      const contas = await ContaCorrenteService.listarContas()
      return response.ok({ data: contas })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ error: 'Erro ao listar contas correntes' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const conta = await ContaCorrenteService.buscarConta(params.id)
      return response.ok({ data: conta })
    } catch (error) {
      return response.status(404).send({ error: 'Conta não encontrada' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = request.only(['numeroConta', 'numeroAgencia', 'saldo', 'cliente_id'])
      const conta = await ContaCorrenteService.criarConta(payload)
      return response.created({ data: conta })
    } catch (error) {
      console.error(error)
      return response.status(400).send({ error: 'Erro ao criar conta' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = request.only(['numeroConta', 'numeroAgencia', 'saldo', 'cliente_id'])
      const conta = await ContaCorrenteService.atualizarConta(params.id, payload)
      return response.ok({ data: conta })
    } catch (error) {
      console.error(error)
      return response.status(400).send({ error: 'Erro ao atualizar conta' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const conta = await ContaCorrenteService.deletarConta(params.id)
      return response.ok({ data: conta })
    } catch (error) {
      return response.status(404).send({ error: 'Conta não encontrada' })
    }
  }
}
