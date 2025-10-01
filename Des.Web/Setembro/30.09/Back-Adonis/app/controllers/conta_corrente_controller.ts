import type { HttpContext } from '@adonisjs/core/http'
import ContaCorrente from '#models/conta_corrente'
import { createContaCorrente, updateContaCorrente } from '#validators/conta_corrente'

export default class ContaCorrentesController {
    async index({ response }: HttpContext) {
        try {
            const contas = await ContaCorrente.all()
            return response.status(200).json({
                message: 'OK',
                data: contas
            })
        } catch {
            return response.status(500).json({ message: 'ERROR', })
        }
    }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createContaCorrente)
        try {
            const conta = await ContaCorrente.create(payload)
            return response.status(201).json({ message: 'OK', data: conta })
        } catch {
            return response.status(500).json({
                message: 'ERROR',

            })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const conta = await ContaCorrente.findOrFail(params.id)
            return response.status(200).json({
                message: 'OK',
                data: conta
            })
        } catch {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async update({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(updateContaCorrente)
        try {
            const conta = await ContaCorrente.findOrFail(params.id)
            await conta.merge(payload).save()
            return response.status(200).json({
                message: 'OK',
                data: conta
            })
        } catch {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const conta = await ContaCorrente.findOrFail(params.id)
            await conta.delete()
            return response.status(200).json({
                message: 'OK'
            })
        } catch {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }
}
