import Cliente from "#models/cliente"
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

    // 🔹 Cria o cliente
    const cliente = await Cliente.create(clientePayload);

    // 🔹 Cria a conta corrente
    await ContaCorrenteService.criarConta({
        clienteId: cliente.id,
        numeroAgencia: '0001',
        saldo: Number(saldo) || 0  // Garante número
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
}

