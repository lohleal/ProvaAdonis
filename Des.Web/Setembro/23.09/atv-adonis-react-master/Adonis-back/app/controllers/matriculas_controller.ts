import type { HttpContext } from '@adonisjs/core/http'
import { createMatricula } from '#validators/matricula'
import MatriculaPolicy from '#policies/matricula_policy'
import MatriculaService from '#services/matricula_service'
import logger from '@adonisjs/core/services/logger'

export default class MatriculasController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MatriculaPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar matriculas' })
      }

      const matriculas = await MatriculaService.listarMatriculas()
      return response.status(200).json({ message: 'OK', data: matriculas })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async create({}: HttpContext) {}

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createMatricula)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MatriculaPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para listar matriculas' })
      }

      const matricula = await MatriculaService.criarMatricula(payload)
      return response.status(201).json({ message: 'OK', data: matricula })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params }: HttpContext) {}

  async edit({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {}

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MatriculaPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover matriculas' })
      }

      await MatriculaService.deletarMatricula(params.alunoId, params.disciplinaId)

      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }
}