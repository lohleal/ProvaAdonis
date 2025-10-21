import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function IndexMovimentacaoAplicacao() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();
    const isGerente = dataUser?.papel_id === 1;  

    function fetchData() {
        setLoad(true);
        setTimeout(() => {
            Promise.all([
                Client.get('movimentacoes'),
                Client.get('aplicacoesFinanceiras')
            ])
                .then(([movimentacoesRes, aplicacoesRes]) => {
                   
                    const movimentacoes = movimentacoesRes.data.data
                        .filter(m => m.tipo === 'transferencia') 
                        .filter(m => {
                            if (isGerente) return true;
                            const clienteEmailOrigem = m.contaOrigem?.cliente?.email;
                            const clienteEmailDestino = m.contaDestino?.cliente?.email;
                            return clienteEmailOrigem === dataUser.email || clienteEmailDestino === dataUser.email;
                        })
                        .map(m => ({
                            tipo_formatado: 'Transferência',
                            valor_formatado: new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(m.valor),
                            conta: `${m.contaOrigem.numeroConta} / ${m.contaDestino.numeroConta}`,
                        }));

                
                    const aplicacoes = aplicacoesRes.data.data
                        .filter(a => {
                            if (isGerente) return true;  
                            return a.contaCorrente.cliente?.email === dataUser.email;  
                        })
                        .map(a => ({
                            tipo_formatado: 'Aplicação',
                            valor_formatado: new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(a.valor),
                            conta: `${a.contaCorrente.numeroConta} - ${a.contaCorrente.cliente?.nomeCompleto}`,
                        }));

                    // Combina as duas fontes de dados
                    const combinedData = [...movimentacoes, ...aplicacoes];
                    setData(combinedData);
                })
                .catch(console.error)
                .finally(() => setLoad(false));
        }, 500);
    }

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.listMovimentacao === 0 && permissions.listAplicacaoFinanceira === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchData();
    }, []);

    return (
        <>
            <NavigationBar />
            {load
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#4D0F0F" size="medium" />
                </Container>
                : <Container className='mt-2'>
                    <DataTable
                        title="Movimentações e Aplicações Financeiras"
                        rows={['Tipo', 'Valor', 'Conta']}
                        hide={[false, false, false]}
                        data={data}
                        keys={['tipo_formatado', 'valor_formatado', 'conta']}
                        resource='movimentacoesAplicacoes'
                        crud={['viewMovimentacao', 'createMovimentacao', 'editMovimentacao', 'deleteMovimentacao']}
                        showCreateButton={false}
                        customButtons={[
                            {
                                label: 'Transferir',
                                to: '/movimentacoes/create',
                                permission: 'createMovimentacao'
                            },
                            {
                                label: 'Aplicar',
                                to: '/aplicacoesFinanceiras/create',
                                permission: 'createAplicacaoFinanceira'
                            }
                        ]}
                    />
                </Container>
            }
        </>
    );
}
