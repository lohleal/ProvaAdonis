import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissoes.js'

export default class ContaCorrentePolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].listContaCorrente
  }
  view(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].viewContaCorrente
  }
  create(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].createContaCorrente
  }

  edit(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].editContaCorrente
  }

  delete(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].deleteContaCorrente
  }
}
