import type { HttpContext } from '@adonisjs/core/http'
import Movimentacao from '#models/movimentacao'
import { createMovimentacao, updateMovimentacao } from '#validators/movimentacao'

export default class MovimentacoesController {
    async index({ response }: HttpContext) {
        try {
            const movimentacoes = await Movimentacao.all()
            return response.status(200).json({
                message: 'OK',
                data: movimentacoes
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createMovimentacao)
        try {
            const movimentacao = await Movimentacao.create({ ...payload })
            return response.status(201).json({
                message: 'OK',
                data: movimentacao
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const movimentacao = await Movimentacao.findOrFail(params.id)
            return response.status(200).json({
                message: 'OK',
                data: movimentacao
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async update({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(updateMovimentacao)
        try {
            const movimentacao = await Movimentacao.findOrFail(params.id)
            await movimentacao.merge({ ...payload }).save()
            return response.status(200).json({
                message: 'OK',
                data: movimentacao
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const movimentacao = await Movimentacao.findOrFail(params.id)
            await movimentacao.delete()
            return response.status(200).json({
                message: 'OK',
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',

            })
        }
    }
}
