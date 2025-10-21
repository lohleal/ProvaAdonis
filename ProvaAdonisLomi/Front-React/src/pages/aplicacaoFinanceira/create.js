import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateAplicacaoFinanceira() {
    const [valor, setValor] = useState('');
    const [contaEncontrada, setContaEncontrada] = useState(null);
    const [erro, setErro] = useState('');
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();

    const permissions = getPermissions();
    const dataUser = getDataUser();


    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createAplicacaoFinanceira === 0) navigate(-1);
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

    function sendData() {
        if (!contaEncontrada) {
            setErro('Conta corrente não encontrada.');
            return;
        }

        const aplicacaoFinanceira = {

            valor: parseFloat(valor),
            conta_corrente_id: contaEncontrada.id,

        };

        Client.post('aplicacoesFinanceiras', aplicacaoFinanceira)
            .then(() => navigate('/movimentacoes'))
            .catch(console.error);
    }

    return (
        <>
            <NavigationBar />
            {load ? (
                <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#4d0f0f" size="medium" />
                </Container>
            ) : (
                <Container className='mt-2'>
                    <div className="row">
                        <div className="col-md-12">

                        </div >
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
                                <div

                                    style={{
                                        padding: '5px 10px',
                                        fontSize: '14px',
                                        lineHeight: '1.2',
                                        display: 'inline-block',
                                        minWidth: 'auto'
                                    }}
                                >
                                    Saldo: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contaEncontrada.saldo)}</strong>
                                </div>
                            )}

                            {erro && (
                                <Alert variant="danger" className="mt-2 small py-2">
                                    {erro}
                                </Alert>
                            )}
                        </div>

                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/movimentacoes')} />
                        <Submit
                            value="Aplicar"
                            onClick={sendData}
                            
                        />
                    </div>
                </Container>
            )}
        </>
    );
}