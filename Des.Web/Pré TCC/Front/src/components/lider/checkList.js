import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { 
  ContainerPesquisa, 
  BotaoEspacado,
  InputPesquisa, 
  IconePesquisa, 
  ModalCentralizado,
  BotaoAcao,
  BotaoFechar,
  TabelaEstilizada,
  ModalFundoTransparente,
  FormularioModal,
  Label,
  InputModal,
  Select,
  Option,
  LabelTextarea,
  Confirmar
} from './style';

export default function CheckList(props) {
  const [mostrarModalTabela, setMostrarModalTabela] = useState(true);
  const [mostrarModalEntrada, setMostrarModalEntrada] = useState(false);
  const [mostrarModalSaida, setMostrarModalSaida] = useState(false);
  const [mostrarModalAtualizar, setMostrarModalAtualizar] = useState(false);
  const [mostrarModalInfo, setMostrarModalInfo] = useState(false);

  function abrirModal(tipo, item) {
    if (tipo === 'entrada') setMostrarModalEntrada(true);
    if (tipo === 'saida') setMostrarModalSaida(true);
    if (tipo === 'atualizar') setMostrarModalAtualizar(true);
    if (tipo === 'info') setMostrarModalInfo(true);
  };

  return (
    <>
      {mostrarModalTabela && (
        <ModalCentralizado>
          <BotaoFechar onClick={() => { setMostrarModalTabela(false); props.sumirVoltar(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </BotaoFechar>

          <ContainerPesquisa>
            <InputPesquisa type="text" placeholder="Digite a placa..." />
            <IconePesquisa xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </IconePesquisa>

            <BotaoEspacado>
              <BotaoAcao onClick={() => abrirModal('entrada', '')}>Entrada
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </BotaoAcao>
            </BotaoEspacado>
          </ContainerPesquisa>

          <hr />

          <TabelaEstilizada>
            <Table striped hover>
              <thead>
                <tr>
                  <th></th>
                  {props.rows.map((item, index) => (
                    props.hide[index]
                      ? <th className='d-none d-md-table-cell'>{item.toUpperCase()}</th>
                      : <th>{item.toUpperCase()}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((report) => (
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    {props.keys.map((key, index) => (
                      props.hide[index]
                        ? <td className='d-none d-md-table-cell'>{report[key]}</td>
                        : <td>{report[key]}</td>
                    ))}
                    {props.hide[props.keys.length]
                      ? <td className='d-none d-md-table-cell'>
                          <BotaoAcao onClick={() => abrirModal('atualizar', '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#5c4033">
                              <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                            </svg>
                          </BotaoAcao>
                          <BotaoAcao onClick={() => abrirModal('info', '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#5c4033">
                              <path d="M480-680q-33 0-56.5-23.5T400-760q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760q0 33-23.5 56.5T480-680Zm-60 560v-480h120v480H420Z" />
                            </svg>
                          </BotaoAcao>
                        </td>
                      : <td>
                          <BotaoAcao onClick={() => abrirModal('atualizar', '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#5c4033">
                              <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                            </svg>
                          </BotaoAcao>
                          <BotaoAcao onClick={() => abrirModal('info', '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#5c4033">
                              <path d="M480-680q-33 0-56.5-23.5T400-760q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760q0 33-23.5 56.5T480-680Zm-60 560v-480h120v480H420Z" />
                            </svg>
                          </BotaoAcao>
                          <BotaoAcao onClick={() => abrirModal('saida', '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
                              <path d="M200-440v-80h560v80H200Z" />
                            </svg>
                        </BotaoAcao>
                        </td>
                    }
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabelaEstilizada>
        </ModalCentralizado>
      )}

      {mostrarModalEntrada && (
        <ModalFundoTransparente>
          <ModalCentralizado>
            <BotaoFechar onClick={() => setMostrarModalEntrada(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </BotaoFechar>

            <Label>Entrada</Label>
            <FormularioModal>
              <InputModal type="text" placeholder="Digite o CPF" />
              <InputModal type="text" placeholder="Digite o CNPJ" />
              <InputModal type="text" placeholder="Digite o Telefone" />
              <InputModal type="datetime-local" />

              <Select>
                <Option value="">Tipo de cliente</Option>
                <Option>Padrão</Option>
                <Option>Cadastrado</Option>
                <Option>Premium</Option>
                <Option>Power</Option>
                <Option>Fidelidade</Option>
                <Option>Aditivado</Option>
              </Select>

              <LabelTextarea>Motivo: <textarea rows="3" /></LabelTextarea>

              <Confirmar>Confirmar</Confirmar>
            </FormularioModal>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}

      {mostrarModalSaida && (
        <ModalFundoTransparente>
          <ModalCentralizado>
            <BotaoFechar onClick={() => setMostrarModalSaida(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </BotaoFechar>

            <Label>Saída</Label>
            <FormularioModal>
              <InputModal type="datetime-local" />

              <Select>
                <Option value="">Opção de Pagamento</Option>
                <Option value="debito">Cartão Débito</Option>
                <Option value="credito">Cartão Crédito</Option>
                <Option value="aldo">PIX ALDO</Option>
                <Option value="tef">PIX TEF</Option>
                <Option value="dinheiro">Dinheiro</Option>
              </Select>
              <InputModal type="text" readOnly />

              <LabelTextarea>Motivo: <textarea rows="3" /></LabelTextarea>

              <Confirmar onClick={() => alert("Confirma saída?")}>Confirmar</Confirmar>
            </FormularioModal>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}

      {mostrarModalAtualizar && (
        <ModalFundoTransparente>
          <ModalCentralizado>
            <BotaoFechar onClick={() => setMostrarModalAtualizar(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </BotaoFechar>

            <Label>Atualizar Dados</Label>
            <FormularioModal>
              <InputModal type="text" placeholder="CPF" />
              <InputModal type="text" placeholder="CNPJ" />
              <InputModal type="text" placeholder="Placa" />
              <InputModal type="text" placeholder="Telefone" />
              <InputModal type="datetime-local" />

              <Select>
                <Option value="">Tipo de cliente</Option>
                <Option>Padrão</Option>
                <Option>Cadastrado</Option>
                <Option>Premium</Option>
                <Option>Power</Option>
                <Option>Fidelidade</Option>
                <Option>Aditivado</Option>
              </Select>

              <LabelTextarea>Motivo: <textarea rows="3" /></LabelTextarea>

              <Confirmar>Confirmar</Confirmar>
            </FormularioModal>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}

      {mostrarModalInfo && (
        <ModalFundoTransparente>
          <ModalCentralizado>
            <BotaoFechar onClick={() => setMostrarModalInfo(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </BotaoFechar>

            <Label>Informações Completas</Label>
            <p>Placa: </p>
            <p>CPF: </p>
            <p>Telefone: </p>
            <p>Entrada: </p>
            <p>Tipo de Cliente: </p>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}
    </>
  );
}