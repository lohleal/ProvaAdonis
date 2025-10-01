import type { HttpContext } from '@adonisjs/core/http'
import AplicacaoFinanceira from '#models/aplicacao_financeira'
import { createAplicacaoFinanceira, updateAplicacaoFinanceira } from '#validators/aplicacao_financeira'

export default class AplicacoesFinanceirasController {
    async index({ response }: HttpContext) {
        try {
            const aplicacoes = await AplicacaoFinanceira.all()
            return response.status(200).json({
                message: 'OK',
                data: aplicacoes
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR'
            })
        }
    }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createAplicacaoFinanceira)
        try {
            const aplicacao = await AplicacaoFinanceira.create(payload)
            return response.status(201).json({
                message: 'OK',
                data: aplicacao
            })
        } catch {
            return response.status(500).json({
                message: 'ERROR'
            })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const aplicacao = await AplicacaoFinanceira.findOrFail(params.id)
            return response.status(200).json({
                message: 'OK',
                data: aplicacao
            })
        } catch {
            return response.status(500).json({
                message: 'ERROR'
            })
        }
    }

    async update({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(updateAplicacaoFinanceira)
        try {
            const aplicacao = await AplicacaoFinanceira.findOrFail(params.id)
            await aplicacao.merge(payload).save()
            return response.status(200).json({
                message: 'OK',
                data: aplicacao
            })
        } catch {
            return response.status(500).json({
                message: 'ERROR'
            })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const aplicacao = await AplicacaoFinanceira.findOrFail(params.id)
            await aplicacao.delete()
            return response.status(200).json({
                message: 'OK'
            })
        } catch {
            return response.status(500).json({
                message: 'ERROR'
            })
        }
    }
}