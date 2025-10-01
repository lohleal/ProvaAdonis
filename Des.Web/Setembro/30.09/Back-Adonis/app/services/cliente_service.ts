import Cliente from '#models/cliente'

export default class ClienteService {
  static async listarClientes() {
    return Cliente.all()
  }

  static async buscarCliente(id: number) {
    return await Cliente.findOrFail(id)
  }

  static async criarCliente(payload: any) {
    return await Cliente.create(payload)
  }

  static async atualizarCliente(id: number, payload: any) {
    const cliente = await Cliente.findOrFail(id)
    cliente.merge(payload)
    await cliente.save()
    return cliente
  }

  static async deletarCliente(id: number) {
    const cliente = await Cliente.findOrFail(id)
    await cliente.delete()
    return cliente
  }

  static async buscarPorEmail(email: string) {
    return await Cliente.query().where('email', email).first()
  }

  static async buscarPorCPF(cpf: string) {
    return await Cliente.query().where('cpf', cpf).first()
  }
}
