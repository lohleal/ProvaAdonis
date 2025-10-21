import vine from '@vinejs/vine'

export const createAplicacaoFinanceira = vine.compile(
  vine.object({
    valor: vine.number().positive(),
    conta_corrente_id: vine.number().positive().withoutDecimals(),
   
  })
)

export const updateAplicacaoFinanceira = vine.compile(
  vine.object({
    valor: vine.number().positive().optional(),
    conta_corrente_id: vine.number().positive().withoutDecimals().optional(),
    
  })
)