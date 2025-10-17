import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissoes.js'

export default class ClientePolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].listCliente
  }
  view(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].viewCliente
  }
  create(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].createCliente
  }

  edit(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].editCliente
  }

  delete(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papelIdSeguro].deleteCliente
  }
}
