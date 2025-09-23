import vine from '@vinejs/vine'

// Valida a criação dos cursos (create)
export const createCurso = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4),
    duracao: vine.number().positive().withoutDecimals(),
  })
)
// Valida a atualização dos cursos (update)
export const updateCurso = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4).optional(),
    duracao: vine.number().positive().withoutDecimals().optional(),
  })
)
