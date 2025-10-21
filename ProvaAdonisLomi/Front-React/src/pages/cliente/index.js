
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import PerfilDoCliente from '../../components/PerfilDoCliente'; 

export default function HomeCliente() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();
    const isGerente = dataUser?.papel_id === 1;

    async function fetchData() {
        setLoad(true);

        try {
            const [resClientes, resContas] = await Promise.all([
                Client.get('clientes'),
                Client.get('contasCorrentes')
            ]);

            const clientes = resClientes.data.data;
            const contas = resContas.data.data;

            const contasMap = new Map(contas.map(c => [c.clienteId, c]));

            const clientesComConta = clientes.map(c => {
                const conta = contasMap.get(c.id);
                return {
                    ...c,
                    endereco_completo: `${c.rua}, ${c.numeroCasa} - ${c.cidade}/${c.estado}`,
                    conta_corrente: conta?.numeroConta || '—',
                    saldo: Number(conta?.saldo) || 0, 
                    
                };
            });



            setData(clientesComConta);

        } catch (err) {
           
        } finally {
            setLoad(false);
        }
    }

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.listCliente === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchData();
    }, []);

    const clienteAtual = data[0];
    return (
        <>
            <NavigationBar />
            {load ? (
                <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#4D0F0F" size="medium" />
                </Container>
            ) : (
                <Container className='mt-2'>
                    {isGerente ? (
                        <DataTable
                            title="Clientes"
                            rows={['Nome', 'Email', 'CPF', 'Conta Corrente', 'Ações']}
                            hide={[false, false, false, false, false]}
                            data={data}
                            keys={['nomeCompleto', 'email', 'cpf', 'conta_corrente']}
                            resource='clientes'
                            crud={['viewCliente', 'createCliente', 'editCliente', 'deleteCliente']}
                            showCreateButton={false}
                            customButtons={[
                                {
                                    label: 'Novo Cliente',
                                    to: '/clientes/create',
                                    permission: 'createCliente'
                                }
                            ]}
                        />
                    ) : clienteAtual ? (
                        <PerfilDoCliente cliente={clienteAtual} />
                    ) : (
                        <p>Nenhum dado de cliente disponível.</p>
                    )}
                </Container>
            )}
        </>
    );
}

