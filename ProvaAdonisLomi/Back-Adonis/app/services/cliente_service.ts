import Cliente from "#models/cliente"
import User from "#models/user"
import ContaCorrenteService from "./conta_corrente_service.js"

export default class ClienteService {
  static async listarClientes() {
    const clientes = await Cliente.query().preload('contas')
    return clientes.map(c => c.toJSON())
  }

  static async buscarCliente(id: number) {
    const cliente = await Cliente.query().where('id', id).preload('contas').firstOrFail()
    return cliente.toJSON()
  }

  static async criarCliente(payload: any) {
    console.log('🔹 Payload RECEBIDO no backend (bruto):', JSON.stringify(payload, null, 2));  // Adicione no início
    const { saldo = 0, ...clientePayload } = payload;
    console.log('🔹 Saldo extraído:', saldo, 'Tipo:', typeof saldo);
    console.log('🔹 ClientePayload (sem saldo):', JSON.stringify(clientePayload, null, 2));

    console.log('Payload original:', payload);
    console.log('ClientePayload (sem saldo):', clientePayload);
    console.log('Saldo para conta:', saldo);

    const cliente = await Cliente.create(clientePayload);

    await ContaCorrenteService.criarConta({
      clienteId: cliente.id,
      numeroAgencia: '2023',
      saldo: Number(saldo) || 0
    });

    return cliente.toJSON();
  }

  static async atualizarCliente(id: number, payload: any) {
    const cliente = await Cliente.findOrFail(id)
    cliente.merge(payload)
    await cliente.save()
    return cliente.toJSON()
  }

  static async deletarCliente(id: number) {
    const cliente = await Cliente.findOrFail(id)
    const data = cliente.toJSON()
    await cliente.delete()
    return data
  }

  static async listarParaUsuario(user: User) {
    if (user.papel_id === 1) {
      // gerente: pega todos
      return await this.listarClientes()
    } else if (user.papel_id === 2) {
      let cliente

      if (user.cliente_id) {
        // cliente com cliente_id preenchido
        cliente = await this.buscarCliente(user.cliente_id)
      } else {
        // cliente sem cliente_id → busca pelo email
        cliente = await Cliente.query().where('email', user.email).preload('contas').firstOrFail()
      }

      return [cliente]
    }
  }

}

