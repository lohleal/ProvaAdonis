
export default function PerfilDoCliente({ cliente }) {
  if (!cliente) return <p>Nenhum cliente encontrado.</p>;

  return (
    <div className="p-4 border rounded shadow-sm bg-light">
      <h3 className="mb-4">Bem Vindo!!</h3>

      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>CPF:</strong> {cliente.cpf}</p>
      <p><strong>Endereço:</strong> {cliente.endereco_completo}</p>
      <p><strong>Conta Corrente:</strong> {cliente.conta_corrente || '—'}</p>
      <p><strong>Saldo:</strong> R$ {cliente.saldo.toFixed(2)}</p>
    </div>
  );
}