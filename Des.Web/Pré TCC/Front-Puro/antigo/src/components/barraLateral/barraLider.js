import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckList from '../lider/checkList';
import CriarLogin from '../lider/criarLogin';
import Funcionarios from '../lider/funcionario';
import Relatorios from '../relatorios/relatorio';

import { Card, Botao, BotaoNews, BotaoVoltar, Conteudo, Label, Select, Option, ArrumarFiltro, Confirmar } from "./styleLider";

export default function BarraLider() {
  const [aberto, setAberto] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');
  const [mostrarVoltar, setMostrarVoltar] = useState(false);
  const [parManha, setParManha] = useState('');
  const [imparManha, setImparManha] = useState('');
  const [parNoite, setParNoite] = useState('');
  const [imparNoite, setImparNoite] = useState('');

  const navigate = useNavigate();

  const motoristas = [
    {
      id: 1,
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
    }
  ];

  const logins = [
    { id: 1, cpf: '111.111.111-11', senha: 'admin123' },
    { id: 2, cpf: '222.222.222-22', senha: 'func456' }
  ];

  const relatorios = [
    { id: 1, ano: '2023', mes: 'Janeiro', turno: 'Manhã', dia: '20/03', valor: 'R$1000,00' },
    { id: 2, ano: '2023', mes: 'Fevereiro', turno: 'Noite', dia: '02/11', valor: 'R$1500,00' },
  ];

  const chavesMotoristas = ['dataHora', 'placa', 'telefone'];
  const chavesFuncionarios = ['id', 'cpf', 'nome', 'telefone'];
  const chavesLogins = ['cpf', 'senha'];
  const chavesRelatorios = ['ano', 'mes', 'turno', 'dia', 'valor'];

  function abrir(opcao) {
    if (opcao === 'News') return navigate('/news', { state: { username: 'Marielle' } });
    if (!aberto && opcao === 'Turnos') setAberto(true);
    setOpcaoSelecionada(opcao);
    setTimeout(() => setMostrarVoltar(true), 400);
  }

  function fechar() {
    setAberto(false);
    setOpcaoSelecionada('');
    setMostrarVoltar(false);
  }

  return (
    <div style={{ display: 'flex' }}>
      <Card className={aberto ? 'abrir' : 'fechar'}>
        {mostrarVoltar && (
          <BotaoVoltar onClick={fechar}>←</BotaoVoltar>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Botao onClick={() => abrir('Funcionários')}>Funcionários</Botao>
          <Botao onClick={() => abrir('CriarLogin')}>Criar login</Botao>
          <Botao
            onClick={() => abrir('Turnos')}
            className={opcaoSelecionada === 'Turnos' ? 'selecionado' : ''}
          >
            Turnos
          </Botao>
          <Botao onClick={() => abrir('Relatórios')}>Relatórios</Botao>
          <Botao onClick={() => abrir('CheckList')}>CheckList</Botao>
          <BotaoNews onClick={() => abrir('News')}>News</BotaoNews>
        </div>

        {aberto && (
          <Conteudo>
            {opcaoSelecionada === 'Turnos' && (
              <>
                <Label>Turno Manhã:
                  <ArrumarFiltro>
                    <Select onChange={(e) => setParManha(e.target.value)}>
                      <Option value="">Dia Par</Option>
                      <Option value="ana">Ana</Option>
                      <Option value="bia">Bia</Option>
                    </Select>

                    <Select onChange={(e) => setImparManha(e.target.value)}>
                      <Option value="">Dia Ímpar</Option>
                      <Option value="davi">Davi</Option>
                      <Option value="arthur">Arthur</Option>
                    </Select>
                  </ArrumarFiltro>
                </Label>

                <Label>Turno Noite:
                  <ArrumarFiltro>
                    <Select onChange={(e) => setParNoite(e.target.value)}>
                      <Option value="">Dia Par</Option>
                      <Option value="lilo">Lilo</Option>
                      <Option value="stich">Stich</Option>
                    </Select>

                    <Select onChange={(e) => setImparNoite(e.target.value)}>
                      <Option value="">Dia Ímpar</Option>
                      <Option value="josé">José</Option>
                      <Option value="gabriel">Gabriel</Option>
                    </Select>
                  </ArrumarFiltro>
                </Label>

              </>
            )}
          </Conteudo>
        )}
      </Card>

      {opcaoSelecionada === 'Funcionários' && (
        <Funcionarios
          title="Funcionários"
          resource="funcionarios" 
          rows={['ID', 'CPF', 'Nome', 'Telefone']}
          keys={chavesFuncionarios}
          data={[]} 
          hide={[false, false, false, false]} 
          voltar={() => {
            setOpcaoSelecionada('');
            setMostrarVoltar(false);
          }}
        />
      )}

      {opcaoSelecionada === 'CriarLogin' && (
        <CriarLogin
          title="Logins"
          resource="logins"
          rows={['CPF', 'Senha']}
          keys={chavesLogins}
          data={logins}
          hide={[false, false]}
          voltar={() => {
            setOpcaoSelecionada('');
            setMostrarVoltar(false);
          }}
        />
      )}

      {opcaoSelecionada === 'CheckList' && (
        <CheckList
          title="CheckList"
          resource="motoristas"
          rows={['DataHora', 'Placa', 'Telefone']}
          keys={chavesMotoristas}
          data={motoristas}
          hide={[false, false, false]}
          voltar={() => {
            setOpcaoSelecionada('');
            setMostrarVoltar(false);
          }}
        />
      )}

      {opcaoSelecionada === 'Relatórios' && (
        <Relatorios
          title="Relatórios"
          resource="relatorios"
          rows={['Ano', 'Mês', 'Turno', 'Dia', 'Valor']}
          keys={chavesRelatorios}
          data={relatorios}
          hide={[false, false, false, false, false]}
          voltar={() => {
            setOpcaoSelecionada('');
            setMostrarVoltar(false);
          }}
        />
      )}
    </div>
  );
}