import vine from '@vinejs/vine'

// Valida a criação dos alunos (create)
export const createAluno = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4),
    curso_id: vine.number().positive().withoutDecimals(),
  })
)
// Valida a atualização dos alunos (update)
export const updateAluno = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(4).optional(),
    curso_id: vine.number().positive().withoutDecimals().optional(),
  })
)
