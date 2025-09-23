import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {
  ContainerPesquisa,
  Label,
  Select,
  Option,
  TabelaEstilizada,
  BotaoAcao,
  ModalCentralizado,
  ModalFundoTransparente,
  BotaoFechar
} from './style';

export default function Relatorios(props) {
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [turno, setTurno] = useState('');
  const [dia, setDia] = useState('');
  const [mostrarModalTabela, setMostrarModalTabela] = useState(true);
  const [mostrarModalInfo, setMostrarModalInfo] = useState(false);

  function abrirModal(tipo, item) {
    if (tipo === 'info') setMostrarModalInfo(true);
  }

  return (
    <>
      {mostrarModalTabela && (
        <ModalCentralizado>
          <BotaoFechar onClick={() => { setMostrarModalTabela(false); props.voltar();}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 960 960" fill="#5c4033">
              <path d="m256 760-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </BotaoFechar>

          <ContainerPesquisa>
            <Select onChange={(e) => setAno(e.target.value)}>
              <Option value="">Selecione o Ano</Option>
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
            </Select>

            <Select onChange={(e) => setMes(e.target.value)}>
              <Option value="">Selecione o Mês</Option>
              <Option value="1">Janeiro</Option>
              <Option value="2">Fevereiro</Option>
              <Option value="3">Março</Option>
              <Option value="4">Abril</Option>
              <Option value="5">Maio</Option>
              <Option value="6">Junho</Option>
              <Option value="7">Julho</Option>
              <Option value="8">Agosto</Option>
              <Option value="9">Setembro</Option>
              <Option value="10">Outubro</Option>
              <Option value="11">Novembro</Option>
              <Option value="12">Dezembro</Option>
            </Select>

            <Select onChange={(e) => setTurno(e.target.value)}>
              <Option value="">Selecione o Turno</Option>
              <Option value="manha">Manhã</Option>
              <Option value="noite">Noite</Option>
            </Select>

            <Select onChange={(e) => setDia(e.target.value)}>
              <Option value="">Selecione o dia</Option>
              <Option value="manha">Par</Option>
              <Option value="noite">Ímpar</Option>
            </Select>
          </ContainerPesquisa>

          <hr />
          <TabelaEstilizada>
            <Table striped hover>
              <thead>
                <tr>
                  {props.rows.map((item, index) =>
                    props.hide[index]
                      ? <th className='d-none d-md-table-cell' key={index}>{item.toUpperCase()}</th>
                      : <th key={index}>{item.toUpperCase()}</th>
                  )}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((report) => (
                  <tr key={report.id}>
                    {props.keys.map((key, index) =>
                      props.hide[index]
                        ? <td className='d-none d-md-table-cell' key={index}>{report[key]}</td>
                        : <td key={index}>{report[key]}</td>
                    )}
                    <td className={props.hide[props.keys.length] ? 'd-none d-md-table-cell' : ''}>
                      <BotaoAcao onClick={() => abrirModal('info', '')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 960 960" fill="#5c4033">
                          <path d="M480 280q-33 0-56.5-23.5T400 200q0-33 23.5-56.5T480 120q33 0 56.5 23.5T560 200q0 33-23.5 56.5T480 280Zm-60 560V360h120v480H420Z"/>
                        </svg>
                      </BotaoAcao>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabelaEstilizada>
        </ModalCentralizado>
      )}

      {mostrarModalInfo && (
        <ModalFundoTransparente>
          <ModalCentralizado>
            <BotaoFechar onClick={() => setMostrarModalInfo(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 960 960" fill="#5c4033">
                <path d="m256 760-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </BotaoFechar>
            <Label>Informações Completas</Label>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}
    </>
  );
}
