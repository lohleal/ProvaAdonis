import { useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function EditMovimentacao() {
    const location = useLocation();
    const movimentacao = location.state?.item;
    const navigate = useNavigate();

    const [valor, setValor] = useState(movimentacao.valor || '');
    const [cpfDestino, setCpfDestino] = useState(movimentacao.contaDestino?.cliente?.cpf || '');
    const [descricao, setDescricao] = useState(movimentacao.descricao || '');
    const [dataMovimentacao, setDataMovimentacao] = useState(movimentacao.data_movimentacao?.slice(0,16) || '');
    const [contaOrigemEncontrada, setContaOrigemEncontrada] = useState(movimentacao.contaOrigem || null);
    const [contaDestinoEncontrada, setContaDestinoEncontrada] = useState(movimentacao.contaDestino || null);
    const [erroDestino, setErroDestino] = useState('');
    const [load, setLoad] = useState(false);
    const [show, setShow] = useState(false);

    const permissions = getPermissions();
    const dataUser = getDataUser();

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.editMovimentacao === 0) navigate(-1);
    }

    async function buscarContaDestinoPorCPF(cpf) {
        if (!cpf) {
            setContaDestinoEncontrada(null);
            setErroDestino('');
            return;
        }

        try {
            const response = await Client.get('contasCorrentes');
            if (response.data.data) {
                const contaEncontrada = response.data.data.find(c => c.cliente?.cpf === cpf);
                if (!contaEncontrada) {
                    setContaDestinoEncontrada(null);
                    setErroDestino('Nenhuma conta encontrada com esse CPF.');
                    return;
                }

                if (contaEncontrada.cliente?.cpf === contaOrigemEncontrada?.cliente?.cpf) {
                    setContaDestinoEncontrada(null);
                    setErroDestino('Não é possível transferir para sua própria conta.');
                    return;
                }

                setContaDestinoEncontrada(contaEncontrada);
                setErroDestino('');
            }
        } catch {
            setErroDestino('Erro ao buscar conta destino pelo CPF.');
        }
    }

    useEffect(() => {
        verifyPermission();
    }, []);

    useEffect(() => {
        if (cpfDestino.length === 11) {
            const timer = setTimeout(() => buscarContaDestinoPorCPF(cpfDestino), 600);
            return () => clearTimeout(timer);
        }
    }, [cpfDestino]);

    function updateMovimentacao() {
        if (!contaOrigemEncontrada || !contaDestinoEncontrada || !valor) return;

        const upMovimentacao = {
            tipo: 'transferencia',
            valor: parseFloat(valor),
            conta_origem_id: contaOrigemEncontrada.id,
            conta_destino_id: contaDestinoEncontrada.id,
            descricao,
            data_movimentacao: new Date(dataMovimentacao).toISOString().slice(0, 19).replace('T', ' ')
        };

        Client.put(`movimentacoes/${movimentacao.id}`, upMovimentacao)
            .then(() => setShow(true))
            .catch(console.error);
    }

    const handleClose = () => {
        setShow(false);
        navigate('/movimentacoes');
    };

    return (
        <>
            <NavigationBar />
            {load ? (
                <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#582770" size="medium" />
                </Container>
            ) : (
                <Container className='mt-3'>
                    {contaOrigemEncontrada && (
                        <div className="mb-3">
                            <Label>Conta de Origem</Label>
                            <Input type="text" value={contaOrigemEncontrada.numeroConta} disabled />
                        </div>
                    )}

                    <div className="row">
                        <div className="col-md-6">
                            <Label>CPF do Destinatário</Label>
                            <Input
                                type="text"
                                value={cpfDestino}
                                onChange={e => setCpfDestino(e.target.value.replace(/\D/g, ''))}
                                maxLength="11"
                                placeholder="Digite o CPF do destinatário"
                            />
                        </div>
                        <div className="col-md-6">
                            <Label>Valor</Label>
                            <Input
                                type="number"
                                value={valor}
                                onChange={e => setValor(e.target.value)}
                                step="0.01"
                                min="0.01"
                                placeholder="Digite o valor"
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <Label>Descrição</Label>
                        <Input
                            type="text"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Descrição da transferência"
                        />
                    </div>

                    <div className="mt-3">
                        <Label>Data da Movimentação</Label>
                        <Input
                            type="datetime-local"
                            value={dataMovimentacao}
                            onChange={e => setDataMovimentacao(e.target.value)}
                        />
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/movimentacoes')} />
                        <Submit
                            value="Alterar"
                            onClick={updateMovimentacao}
                            disabled={!valor || !cpfDestino || !contaDestinoEncontrada}
                        />
                    </div>
                </Container>
            )}

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualização - Transferência PIX</Modal.Title>
                </Modal.Header>
                <Modal.Body>Operação efetuada com sucesso!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
