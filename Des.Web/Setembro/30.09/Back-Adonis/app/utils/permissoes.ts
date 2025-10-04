export const permissions = [
  // Papel 1: Gerente
  {
    listCliente: true,
    viewCliente: true,
    createCliente: true,
    editCliente: true,
    deleteCliente: true,

    listContaCorrente: true,
    viewContaCorrente: true,
    createContaCorrente: true,
    editContaCorrente: true,
    deleteContaCorrente: true,

    listMovimentacao: true,
    viewMovimentacao: true,
    createMovimentacao: true,
    editMovimentacao: true,
    deleteMovimentacao: true,

    listAplicacaoFinanceira: true,
    viewAplicacaoFinanceira: true,
    createAplicacaoFinanceira: true,
    editAplicacaoFinanceira: true,
    deleteAplicacaoFinanceira: true,
  },
  // Papel 2: Cliente
  {
    listCliente: true,
    viewCliente: true,
    createCliente: false,
    editCliente: false,
    deleteCliente: false,

    listContaCorrente: true,
    viewContaCorrente: true,
    createContaCorrente: false,
    editContaCorrente: false,
    deleteContaCorrente: false,

    listMovimentacao: true,
    viewMovimentacao: true,
    createMovimentacao: true,
    editMovimentacao: false,
    deleteMovimentacao: false,

    listAplicacaoFinanceira: true,
    viewAplicacaoFinanceira: true,
    createAplicacaoFinanceira: true,
    editAplicacaoFinanceira: false,
    deleteAplicacaoFinanceira: false,
  },
]