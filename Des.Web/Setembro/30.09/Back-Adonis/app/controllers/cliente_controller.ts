import type { HttpContext } from '@adonisjs/core/http'
import Cliente from '#models/cliente'
import { createCliente, updateCliente } from '#validators/cliente'

export default class ClienteController {
    async index({ response }: HttpContext) {
        try {
            const clientes = await Cliente.all()
            return response.status(200).json({
                message: 'OK',
                data: clientes
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async create({ }: HttpContext) { }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createCliente)
        try {
            const cliente = await Cliente.create({
                ...payload,
            })
            return response.status(201).json({
                message: 'OK',
                data: cliente
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const cliente = await Cliente.findOrFail(params.id)
            return response.status(200).json({
                message: 'OK',
                data: cliente
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async edit({ params }: HttpContext) { }

    async update({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(updateCliente)
        try {
            const cliente = await Cliente.findOrFail(params.id)
            await cliente.merge({ ...payload }).save()
            return response.status(200).json({
                message: 'OK',
                data: cliente
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const cliente = await Cliente.findOrFail(params.id)
            await cliente.delete()
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
