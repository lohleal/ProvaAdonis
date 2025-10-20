import vine from '@vinejs/vine'

export const createMovimentacao = vine.compile(
  vine.object({
    tipo: vine.literal('transferencia'),
    valor: vine.number().positive(),
    conta_origem_id: vine.number().positive().withoutDecimals(),
    conta_destino_id: vine.number().positive().withoutDecimals(),
    cpf_destinatario: vine.string().regex(/^\d{11}$/),
  })
)

export const updateMovimentacao = vine.compile(
  vine.object({
    valor: vine.number().positive().optional(),
    conta_origem_id: vine.number().positive().withoutDecimals().optional(),
    conta_destino_id: vine.number().positive().withoutDecimals().optional(),
    cpf_destinatario: vine.string().regex(/^\d{11}$/).optional(),
  })
)