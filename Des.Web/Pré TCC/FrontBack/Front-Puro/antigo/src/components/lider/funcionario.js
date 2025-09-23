import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Client from '../../api/client'; 
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

export default function Funcionario(props) {
  const [mostrarModalTabela, setMostrarModalTabela] = useState(true);

  const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
  const [mostrarModalRemover, setMostrarModalRemover] = useState(false);
  const [mostrarModalAtualizar, setMostrarModalAtualizar] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [userSelecionado, setUserSelecionado] = useState(null);

  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const response = await Client.get('/funcionario');
      
      const data = response.data.data || response.data.funcionarios || response.data;
      
      if (Array.isArray(data)) {
        setUsuarios(data); 
      } 
      
      else {
        console.error('Dados não são um array:', data);
        setUsuarios([]);
      }

    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      setUsuarios([]);
    }
  }

  function abrirModal(tipo, item) {
    setUserSelecionado(item);
  
    if (tipo === 'adicionar') {
      setCpf('');
      setNome('');
      setTelefone('');
      setMostrarModalAdicionar(true);
    }
    if (tipo === 'remover') setMostrarModalRemover(true);
    if (tipo === 'atualizar') {      
      setNome(item.nome);
      setTelefone(item.telefone);
      setMostrarModalAtualizar(true);
    }
  }  

  async function handleCreate() {
    if( !cpf || !nome || !telefone) {
      alert('Preencha CPF, Nome e Telefone antes de confirmar!');
      return;
    }

    try {
      const response = await Client.post('/funcionario', { cpf, nome, telefone }); 
      
      await carregarUsuarios();
      setMostrarModalAdicionar(false);
      setCpf('');
      setNome('');
      setTelefone('');
    } catch (error) {
      console.error('Erro ao criar funcionário:', error.response?.data || error.message);
      alert(error.response?.data?.message || "Erro ao criar usuário");
    }
  }  

  async function handleUpdate() {
    try {
      await Client.put(`/funcionario/${userSelecionado.id}`, { nome, telefone });
      await carregarUsuarios();
      setMostrarModalAtualizar(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemove() {
    try {
      await Client.delete(`/funcionario/${userSelecionado.id}`);
      await carregarUsuarios();
      setMostrarModalRemover(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {mostrarModalTabela && (
        <ModalCentralizado>
          <BotaoFechar onClick={() => { setMostrarModalTabela(false); props.voltar(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </BotaoFechar>

          <ContainerPesquisa>
            <InputPesquisa type="text" placeholder="Digite o nome para buscar..." />
            <IconePesquisa xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </IconePesquisa>

            <BotaoEspacado>
              <BotaoAcao onClick={() => abrirModal('adicionar', null)}>
                Adicionar
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
                  <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
                </svg>
              </BotaoAcao>
            </BotaoEspacado>
          </ContainerPesquisa>

          <hr />
          <TabelaEstilizada>
            <Table striped hover>
              <thead>
                <tr>
                  <th>CPF</th>
                  <th>NOME</th>
                  <th>TELEFONE</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(usuarios) && usuarios.map((usuario, index) => (
                  <tr key={usuario.id}>
                    <td>{usuario.cpf}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.telefone}</td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <BotaoAcao onClick={() => abrirModal('atualizar', usuario)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#5c4033">
                          <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
                        </svg>
                      </BotaoAcao>
                      <BotaoAcao onClick={() => abrirModal('remover', usuario)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5c4033">
                          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
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
              <InputModal type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="Digite o CPF" />
              <InputModal type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite o nome" />
              <InputModal type="text" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Digite o telefone" />
              <Confirmar  type="button" onClick={handleCreate}>Confirmar</Confirmar>
            </FormularioModal>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}

      {mostrarModalRemover && (
        <ModalFundoTransparente>
          <ModalCentralizado>
            <BotaoFechar onClick={() => setMostrarModalRemover(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5c4033">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </BotaoFechar>

            <Label>Confirma remover {userSelecionado?.nome}?</Label>
            <FormularioModal>
              <Confirmar type="button" onClick={handleRemove}>Sim</Confirmar>
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
              <InputModal type="text" value={nome} onChange={e => setNome(e.target.value)} />
              <InputModal type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
              <Confirmar  type="button" onClick={handleUpdate}>Confirmar</Confirmar>
            </FormularioModal>
          </ModalCentralizado>
        </ModalFundoTransparente>
      )}
    </>
  );
}