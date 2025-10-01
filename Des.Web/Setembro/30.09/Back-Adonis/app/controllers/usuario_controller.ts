import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import { createUsuario, updateUsuario } from '#validators/usuario'

export default class UsuarioController {

    async index({ response }: HttpContext) {
        try {
            const usuarios = await Usuario.all()
            return response.status(200).json({
                message: 'OK',
                data: usuarios,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async create({ }: HttpContext) { }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createUsuario)
        try {
            const usuario = await Usuario.create({
                ...payload,
            })
            return response.status(201).json({
                message: 'OK',
                data: usuario,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const usuario = await Usuario.findOrFail(params.id)
            return response.status(200).json({
                message: 'OK',
                data: usuario,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async edit({ params }: HttpContext) { }

    async update({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(updateUsuario)
        try {
            const usuario = await Usuario.findOrFail(params.id)
            await usuario.merge({ ...payload }).save()
            return response.status(200).json({
                message: 'OK',
                data: usuario,
            })
        } catch (error) {
            return response.status(500).json({
                message: 'ERROR',
            })
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const usuario = await Usuario.findOrFail(params.id)
            await usuario.delete()
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
