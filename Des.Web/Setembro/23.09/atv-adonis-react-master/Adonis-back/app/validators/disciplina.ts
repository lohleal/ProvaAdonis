import vine from '@vinejs/vine'

// Valida a criação das disciplinas (create)
export const createDisciplina = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4),
    carga: vine.number().positive().withoutDecimals(),
    curso_id: vine.number().positive().withoutDecimals(),
  })
)
// Valida a atualização das disciplinas (update)
export const updateDisciplina = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4).optional(),
    carga: vine.number().positive().withoutDecimals().optional(),
    curso_id: vine.number().positive().withoutDecimals().optional(),
  })
)
