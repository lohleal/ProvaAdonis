import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateMovimentacao() {
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [numeroContaOrigem, setNumeroContaOrigem] = useState('');
    const [numeroContaDestino, setNumeroContaDestino] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataMovimentacao, setDataMovimentacao] = useState('');
    const [contaOrigemEncontrada, setContaOrigemEncontrada] = useState(null);
    const [contaDestinoEncontrada, setContaDestinoEncontrada] = useState(null);
    const [erroOrigem, setErroOrigem] = useState('');
    const [erroDestino, setErroDestino] = useState('');
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    const tiposMovimentacao = [
        { value: 'deposito', label: 'Depósito' },
        { value: 'saque', label: 'Saque' },
        { value: 'transferencia', label: 'Transferência' },
    ];

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createMovimentacao === 0) navigate(-1);
    }

    async function buscarContaOrigemCliente() {
        try {
            const response = await Client.get('contasCorrentes');
            
            if (response.data.data && response.data.data.length > 0) {
                const contaDoUsuario = response.data.data.find(conta => 
                    conta.cliente?.email === dataUser.email || 
                    conta.email === dataUser.email ||
                    conta.cliente_email === dataUser.email
                );
                
                if (contaDoUsuario) {
                    setContaOrigemEncontrada(contaDoUsuario);
                    setNumeroContaOrigem(contaDoUsuario.numeroConta);
                    setErroOrigem('');
                } else {
                    setErroOrigem(`Nenhuma conta encontrada para o email: ${dataUser.email}`);
                }
            } else {
                setErroOrigem('Nenhuma conta cadastrada no sistema.');
            }
        } catch (error) {
            setErroOrigem('Erro ao buscar conta de origem.');
        }
    }

    async function buscarContaDestino(numeroConta) {
        if (!numeroConta) {
            setContaDestinoEncontrada(null);
            setErroDestino('');
            return;
        }

        try {
            const response = await Client.get(`contasCorrentes?numeroConta=${numeroConta}`);
            if (response.data.data && response.data.data.length > 0) {
                const conta = response.data.data[0];
                
                if (conta.numeroConta === contaOrigemEncontrada?.numeroConta) {
                    setContaDestinoEncontrada(null);
                    setErroDestino('Não é possível transferir para a própria conta!');
                } else {
                    setContaDestinoEncontrada(conta);
                    setErroDestino('');
                }
            } else {
                setContaDestinoEncontrada(null);
                setErroDestino('Conta de destino não encontrada');
            }
        } catch (error) {
            setContaDestinoEncontrada(null);
            setErroDestino('Erro ao buscar conta de destino');
        }
    }

    useEffect(() => {
        verifyPermission();
        const agora = new Date();
        const isoLocal = agora.toISOString().slice(0, 16);
        setDataMovimentacao(isoLocal);
        buscarContaOrigemCliente();
        setTimeout(() => setLoad(false), 500);
    }, []);

    useEffect(() => {
        if (tipo === 'transferencia') {
            const timer = setTimeout(() => {
                if (numeroContaDestino && numeroContaDestino.length >= 4) {
                    buscarContaDestino(numeroContaDestino);
                } else {
                    setContaDestinoEncontrada(null);
                    setErroDestino('');
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [numeroContaDestino, tipo, contaOrigemEncontrada]);

    function sendData() {
        if (!contaOrigemEncontrada) {
            setErroOrigem('Conta de origem não encontrada.');
            return;
        }

        if (tipo === 'transferencia' && !contaDestinoEncontrada) {
            setErroDestino('Informe uma conta de destino válida.');
            return;
        }

        if ((tipo === 'saque' || tipo === 'transferencia') && contaOrigemEncontrada.saldo < parseFloat(valor)) {
            setErroOrigem('Saldo insuficiente na conta de origem.');
            return;
        }

        const movimentacao = {
            tipo,
            valor: parseFloat(valor),
            conta_origem_id: contaOrigemEncontrada?.id,
            conta_destino_id: tipo === 'transferencia' ? contaDestinoEncontrada?.id : null,
            descricao,
            data_movimentacao: new Date(dataMovimentacao).toISOString().slice(0, 19).replace('T', ' ')
        };

        Client.post('movimentacoes', movimentacao)
            .then(() => navigate('/movimentacoes'))
            .catch(console.error);
    }

    const showContaDestino = tipo === 'transferencia';

    return (
        <>
            <NavigationBar />
            {load
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#582770" size="medium" />
                </Container>
                : <Container className='mt-2'>
                    <div className="row">
                        <div className="col-md-6">
                            <Label>Tipo de Movimentação</Label>
                            <Select value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option value="">Selecione o tipo</option>
                                {tiposMovimentacao.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-md-6">
                            <Label>Valor</Label>
                            <Input
                                type="number"
                                value={valor}
                                onChange={e => setValor(e.target.value)}
                                placeholder="Digite o valor"
                                step="0.01"
                                min="0.01"
                            />
                        </div>
                    </div>

                    {contaOrigemEncontrada && (
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <Label>Conta de Origem</Label>
                                <Input
                                    type="text"
                                    value={contaOrigemEncontrada.numeroConta}
                                    disabled
                                />
                                <Alert variant="success" className="mt-2 small py-2">
                                    ✅ <strong>Conta do usuário logado:</strong> {contaOrigemEncontrada.numeroConta}<br />
                                    <strong>Cliente:</strong> {contaOrigemEncontrada.cliente?.nomeCompleto || dataUser.nome}<br />
                                    <strong>Saldo:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contaOrigemEncontrada.saldo)}
                                </Alert>
                            </div>
                        </div>
                    )}

                    {erroOrigem && (
                        <Alert variant="danger" className="mt-3">
                            ❌ {erroOrigem}
                        </Alert>
                    )}

                    {showContaDestino && (
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <Label>Número da Conta de Destino</Label>
                                <Input
                                    type="text"
                                    value={numeroContaDestino}
                                    onChange={e => setNumeroContaDestino(e.target.value)}
                                    placeholder="Digite o número da conta de destino"
                                />
                                {contaDestinoEncontrada && (
                                    <Alert variant="success" className="mt-2 small py-2">
                                        ✅ <strong>Conta destino encontrada:</strong> {contaDestinoEncontrada.numeroConta}<br />
                                        <strong>Cliente:</strong> {contaDestinoEncontrada.cliente?.nomeCompleto}
                                    </Alert>
                                )}
                                {erroDestino && (
                                    <Alert variant="danger" className="mt-2 small py-2">
                                        ❌ {erroDestino}
                                    </Alert>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="row mt-3">
                        <div className="col-md-8">
                            <Label>Descrição</Label>
                            <Input
                                type="text"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                placeholder="Digite uma descrição"
                            />
                        </div>
                        <div className="col-md-4">
                            <Label>Data da Movimentação</Label>
                            <Input
                                type="datetime-local"
                                value={dataMovimentacao}
                                onChange={e => setDataMovimentacao(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/movimentacoes')} />
                        <Submit value="Cadastrar" onClick={sendData} disabled={!tipo || !valor || !contaOrigemEncontrada || (showContaDestino && !contaDestinoEncontrada)} />
                    </div>
                </Container>
            }
        </>
    );
}