import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Button, Alert } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function EditAplicacaoFinanceira() {
    const location = useLocation();
    const aplicacao = location.state?.item;

    const [tipo, setTipo] = useState(aplicacao.tipo || '');
    const [valor, setValor] = useState(aplicacao.valor || '');
    const [status, setStatus] = useState(aplicacao.status || 'ativa');
    const [contaEncontrada, setContaEncontrada] = useState(null);
    const [erro, setErro] = useState('');
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const permissions = getPermissions();
    const dataUser = getDataUser();

    const tiposAplicacao = [
        { value: 'poupanca', label: 'Poupança' },
        { value: 'titulos_governo', label: 'Títulos do Governo' },
        { value: 'acoes', label: 'Ações' }
    ];

    const statusAplicacao = [
        { value: 'ativa', label: 'Ativa' },
        { value: 'resgatada', label: 'Resgatada' }
    ];

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.editAplicacaoFinanceira === 0) navigate(-1);
    }

    async function buscarContaDoCliente() {
        try {
            const response = await Client.get('contasCorrentes');
            if (response.data.data && response.data.data.length > 0) {
                const contaDoUsuario = response.data.data.find(conta =>
                    conta.cliente?.email === dataUser.email ||
                    conta.email === dataUser.email ||
                    conta.cliente_email === dataUser.email
                );
                if (contaDoUsuario) {
                    setContaEncontrada(contaDoUsuario);
                    setErro('');
                } else {
                    setErro(`Nenhuma conta encontrada para o email: ${dataUser.email}`);
                }
            } else {
                setErro('Nenhuma conta cadastrada no sistema.');
            }
        } catch (error) {
            setErro('Erro ao buscar conta corrente do cliente.');
        } finally {
            setLoad(false);
        }
    }

    useEffect(() => {
        verifyPermission();
        buscarContaDoCliente();
    }, []);

    function updateAplicacaoFinanceira() {
        if (!contaEncontrada) {
            setErro('Conta corrente não encontrada.');
            return;
        }

        let novoSaldo = contaEncontrada.saldo;
        if (status === 'resgatada') {
            novoSaldo += parseFloat(valor);
        } else if (status === 'ativa' && aplicacao.status === 'resgatada') {
            novoSaldo -= parseFloat(valor);
            if (novoSaldo < 0) {
                setErro('Saldo insuficiente para alterar para ativo.');
                return;
            }
        }

        const upAplicacao = {
            tipo,
            valor: parseFloat(valor),
            conta_corrente_id: contaEncontrada.id,
            status
        };

        Client.put(`aplicacoesFinanceiras/${aplicacao.id}`, upAplicacao)
            .then(() => setShow(true))
            .catch(console.error);
    }

    const handleClose = () => {
        setShow(false);
        navigate('/aplicacoesFinanceiras');
    };

    return (
        <>
            <NavigationBar />
            {load ? (
                <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#582770" size="medium" />
                </Container>
            ) : (
                <Container className='mt-2'>
                    <div className="row">
                        <div className="col-md-12">
                            <Label>Tipo de Aplicação</Label>
                            <Select value={tipo} onChange={e => setTipo(e.target.value)}>
                                <option value="">Selecione o tipo</option>
                                {tiposAplicacao.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-md-12">
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

                    <div className="row mt-3">
                        <div className="col-md-12">
                            <Label>Número da Conta Corrente</Label>
                            <Input
                                type="text"
                                value={contaEncontrada?.numeroConta || ''}
                                disabled
                            />
                            {contaEncontrada && (
                                <Alert
                                    variant="success"
                                    style={{
                                        padding: '5px 10px',
                                        fontSize: '14px',
                                        lineHeight: '1.2',
                                        display: 'inline-block',
                                        minWidth: 'auto'
                                    }}
                                >
                                    <br />
                                    Saldo: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contaEncontrada.saldo)}</strong>
                                </Alert>
                            )}
                            {erro && (
                                <Alert variant="danger" className="mt-2 small py-2">
                                     {erro}
                                </Alert>
                            )}
                        </div>

                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/aplicacoesFinanceiras')} />
                        <Submit
                            value="Alterar"
                            onClick={updateAplicacaoFinanceira}
                            disabled={!contaEncontrada || !tipo || !valor}
                        />
                    </div>
                </Container>
            )}

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualização - Aplicação Financeira</Modal.Title>
                </Modal.Header>
                <Modal.Body>Operação efetuada com sucesso!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}