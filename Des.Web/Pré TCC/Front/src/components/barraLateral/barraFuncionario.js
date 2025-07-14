import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntradaSaida from '../funcionarios/entradaSaida';
import Relatorios from '../relatorios/relatorio';

import { Card, Botao, BotaoNews } from "./styleFuncionario";

export default function BarraFuncionario() {
  const [mostrarEntradaSaida, setMostrarEntradaSaida] = useState(false);
  const [mostrarRelatorios, setMostrarRelatorios] = useState(false);
  const navigate = useNavigate();

  const motoristas = [
    {
      placa: 'ABC1234',
      cpf: '123.456.789-00',
      cnpj: '12.345.678/0001-00',
      telefone: '(11) 91234-5678',
      dataHora: '2025-07-12T10:00',
      tipoCliente: 'Premium',
      motivo: 'Cliente frequente',
      saida: '2025-07-12T15:00',
      pagamento: 'credito',
      valor: 'R$15,00',
    },
    {
      placa: 'XYZ9876',
      cpf: '987.654.321-00',
      cnpj: '98.765.432/0001-99',
      telefone: '(21) 99876-5432',
      dataHora: '2025-07-12T08:30',
      tipoCliente: 'Fidelidade',
      motivo: 'Empresa conveniada',
      saida: '2025-07-12T12:45',
      pagamento: 'pix',
      valor: 'R$12,00',
    }
  ];

  const relatorios = [
    { ano: '2023', mes: 'Janeiro', turno: 'Manhã', valor: 'R$1000,00' },
    { ano: '2023', mes: 'Fevereiro', turno: 'Noite', valor: 'R$1500,00' },
  ];

  const chavesMotoristas = ['dataHora', 'placa', 'telefone'];
  const chavesRelatorios = ['ano', 'mes', 'turno', 'valor'];

  function abrir(opcao) {
    if (opcao === 'News') return navigate('/news', { state: { username: 'Analice' } });
    if (opcao === 'Relatórios') {
      setMostrarRelatorios(true);
    }
    if (opcao === 'Pátio') {
      setMostrarEntradaSaida(true);
    }
  }

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Botao onClick={() => abrir('Relatórios')}>Relatórios</Botao>
          <Botao onClick={() => abrir('Pátio')}>Pátio</Botao>
          <BotaoNews onClick={() => abrir('News')}>News</BotaoNews>
        </div>
      </Card>

      {mostrarEntradaSaida && (
        <EntradaSaida
          rows={['DataHora', 'Placa', 'Telefone']}
          keys={chavesMotoristas}
          data={motoristas}
          hide={[false, false, false]}
          onFecharTabela={() => setMostrarEntradaSaida(false)} 
        />
      )}

      {mostrarRelatorios && (
        <Relatorios
          rows={['Ano', 'Mês', 'Turno', 'Valor']}
          keys={chavesRelatorios}
          data={relatorios}
          hide={[false, false, false, false]}
          voltar={() => setMostrarEntradaSaida(false)} 
        />
      )}
    </div>
  );
}