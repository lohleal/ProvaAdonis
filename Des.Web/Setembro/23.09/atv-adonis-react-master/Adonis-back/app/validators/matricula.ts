import vine from '@vinejs/vine'

// Valida a criação das matriculas (create)
export const createMatricula = vine.compile(
  vine.object({
    aluno_id: vine.number().positive().withoutDecimals(),
    disciplina_id: vine.number().positive().withoutDecimals(),
  })
)
