/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Cliente
const ClienteController = () => import('#controllers/cliente_controller')
router.resource('clientes', 'ClienteController')

// Usuario
const UsuarioController = () => import('#controllers/usuario_controller')
router.resource('usuarios', 'UsuarioController')

// Conta Corrente
const ContaCorrenteController = () => import('#controllers/conta_corrente_controller')
router.resource('contasCorrentes', 'ContaCorrenteController')

// Movimentacao
const MovimentacaoController = () => import('#controllers/movimentacao_controller')
router.resource('movimentacoes', 'MovimentacaoController')

// AplicacaoFinanceira
const AplicacaoFinanceiraController = () => import('#controllers/aplicacao_financeira_controller')
router.resource('aplicacoesFinanceiras', 'AplicacaoFinanceiraController')