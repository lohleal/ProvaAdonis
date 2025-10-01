import vine from '@vinejs/vine'

export const createUsuario = vine.compile(
  vine.object({
    email: vine.string().email(),
    senha: vine.string().minLength(6),
    perfil: vine.enum(['cliente', 'gerente']),
    cliente_id: vine.number().positive().withoutDecimals().optional(), // obrigatório só se perfil = cliente
  })
)

export const updateUsuario = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    senha: vine.string().minLength(6).optional(),
    perfil: vine.enum(['cliente', 'gerente']).optional(),
    cliente_id: vine.number().positive().withoutDecimals().optional(),
  })
)
