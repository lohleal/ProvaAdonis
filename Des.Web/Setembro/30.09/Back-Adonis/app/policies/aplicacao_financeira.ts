import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissoes.js'

export default class AplicacaoFinanceiraPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].listAplicacaoFinanceira
  }
  view(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].viewAplicacaoFinanceira
  }
  create(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].createAplicacaoFinanceira
  }

  edit(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].editAplicacaoFinanceira
  }

  delete(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].deleteAplicacaoFinanceira
  }
}
