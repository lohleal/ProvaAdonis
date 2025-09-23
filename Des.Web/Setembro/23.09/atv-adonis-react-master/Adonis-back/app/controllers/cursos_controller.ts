import type { HttpContext } from '@adonisjs/core/http'
import { createCurso, updateCurso } from '#validators/curso'
import CursoPolicy from '#policies/curso_policy'
import CursoService from '#services/curso_service'

export default class CursosController {
  async index({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(CursoPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar curso' })
      }

      const cursos = await CursoService.listarCursos()
      return response.status(200).json({ message: 'OK', data: cursos })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ auth, bouncer, request, response }: HttpContext) {
    const payload = await request.validateUsing(createCurso)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(CursoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar curso' })
      }

      const curso = await CursoService.criarCurso(payload)
      return response.status(201).json({ message: 'OK', data: curso })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ auth, bouncer, params, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(CursoPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver curso' })
      }

      const curso = await CursoService.buscarCurso(params.id)
      return response.status(200).json({ message: 'OK', data: curso })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async update({ auth, bouncer, params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateCurso)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(CursoPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar curso' })
      }

      const curso = await CursoService.atualizarCurso(params.id, payload)
      return response.status(200).json({ message: 'OK', data: curso })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async destroy({ auth, bouncer, params, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(CursoPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover curso' })
      }

      await CursoService.deletarCurso(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }
}