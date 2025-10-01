import React from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
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
  Confirmar
} from './style';

export default function CriarLogin(props) {
  const [mostrarModalTabela, setMostrarModalTabela] = useState(true);
  const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
  const [mostrarModalRemover, setMostrarModalRemover] = useState(false);
  const [mostrarModalAtualizar, setMostrarModalAtualizar] = useState(false);

  function abrirModal(tipo) {
    if (tipo === 'adicionar') setMostrarModalAdicionar(true);
    if (tipo === 'remover') setMostrarModalRemover(true);
    if (tipo === 'atualizar') setMostrarModalAtualizar(true);
  }

  

  return (
    <>
      {mostrarModalTabela && (
        <ModalCentralizado>
          <BotaoFechar onClick={() => { setMostrarModalTabela(false); props.voltar(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </BotaoFechar>
          <ContainerPesquisa>
            <InputPesquisa type="text" placeholder="Digite a placa..." />
            <IconePesquisa xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </IconePesquisa>
            <BotaoEspacado>
              <BotaoAcao onClick={() => abrirModal('adicionar', '')}>Adicionar
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
                  <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
                </svg>
              </BotaoAcao>
            </BotaoEspacado>
          </ContainerPesquisa>
          <hr />
          <TabelaEstilizada>
            <Table striped hover>
              <thead>
                <tr>
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
                    {props.keys.map((key, index) => (
                      props.hide[index]
                        ? <td className='d-none d-md-table-cell'>{report[key]}</td>
                        : <td>{report[key]}</td>
                    ))}
                    {props.hide[props.keys.length]
                      ? <td className='d-none d-md-table-cell'>
                          <BotaoAcao onClick={() => abrirModal('atualizar', '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#5c4033">
                              <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                            </svg>
                          </BotaoAcao>
                        </td>
                      : <td>
                          <BotaoAcao onClick={() => abrirModal('atualizar', '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#5c4033">
                              <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                            </svg>
                          </BotaoAcao>
                          <BotaoAcao onClick={() => abrirModal('remover', '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
                              <path d="M640-520v-80h240v80H640Zm-280 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
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
      {mostrarModalAdicionar && (
        <ModalFundoTransparente>
          <ModalCentralizado>
            <BotaoFechar onClick={() => setMostrarModalAdicionar(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </BotaoFechar>
            <Label>Adicionar</Label>
            <FormularioModal>
              <InputModal type="text" placeholder="Digite o CPF" />
              <InputModal type="text" placeholder="Digite a senha" />
              <Confirmar>Confirmar</Confirmar>
            </FormularioModal>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}
      {mostrarModalRemover && alert("Confirma saída?")}
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
              <InputModal type="text" placeholder="Digite o CPF" />
              <InputModal type="text" placeholder="Digite a senha" />
              <Confirmar>Confirmar</Confirmar>
            </FormularioModal>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}
    </>
  );
}