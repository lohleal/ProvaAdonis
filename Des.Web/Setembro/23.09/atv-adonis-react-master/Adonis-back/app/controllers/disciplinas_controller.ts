import type { HttpContext } from '@adonisjs/core/http'
import { createDisciplina, updateDisciplina } from '#validators/disciplina'
import DisciplinaPolicy from '#policies/disciplina_policy'
import DisciplinaService from '#services/disciplina_service'
import logger from '@adonisjs/core/services/logger'

export default class DisciplinasController {
  async index({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(DisciplinaPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar disciplina' })
      }

      const disciplinas = await DisciplinaService.listarDisciplinas()
      logger.info(disciplinas)

      return response.status(200).json({ message: 'OK', data: disciplinas })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async create({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(DisciplinaPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar disciplina' })
      }

      const cursos = await DisciplinaService.listarCursos()
      return response.status(200).json({ message: 'OK', data: cursos })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createDisciplina)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(DisciplinaPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar disciplina' })
      }

      const disciplina = await DisciplinaService.criarDisciplina(payload)
      return response.status(201).json({ message: 'OK', data: disciplina })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(DisciplinaPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver disciplina' })
      }

      const disciplina = await DisciplinaService.buscarDisciplina(params.id)
      return response.status(200).json({ message: 'OK', data: disciplina })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async edit({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(DisciplinaPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar disciplina' })
      }

      const cursos = await DisciplinaService.listarCursos()
      return response.status(200).json({ message: 'OK', data: cursos })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateDisciplina)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(DisciplinaPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar disciplina' })
      }

      const disciplina = await DisciplinaService.atualizarDisciplina(params.id, payload)
      return response.status(200).json({ message: 'OK', data: disciplina })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(DisciplinaPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover disciplina' })
      }

      await DisciplinaService.deletarDisciplina(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR' })
    }
  }
}
