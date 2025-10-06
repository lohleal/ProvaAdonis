import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function IndexContaCorrente() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function fetchData() {
        setLoad(true);
        setTimeout(() => {
            Client.get('contasCorrentes')
                .then(res => {
                    const contas = res.data.data.map(c => ({
                        ...c,
                        saldo_formatado: new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(c.saldo),
                        cliente_nome: c.cliente?.nome_completo || '—'
                    }));
                    setData(contas);
                })
                .catch(console.error)
                .finally(() => setLoad(false));
        }, 500);
    }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.listContaCorrente === 0) navigate(-1);
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
                    <OrbitProgress variant="spokes" color="#582770" size="medium" />
                  </Container>
                : <Container className='mt-2'>
                    <DataTable 
                        title="Contas Correntes Registradas" 
                        rows={['Nº Conta', 'Agência', 'Saldo', 'Cliente', 'Ações']}
                        hide={[false, false, false, false, false]}
                        data={data}
                        keys={['numero_conta', 'numero_agencia', 'saldo_formatado', 'cliente_nome']} 
                        resource='contas-correntes'
                        crud={['viewContaCorrente', 'createContaCorrente', 'editContaCorrente', 'deleteContaCorrente']}
                    />
                  </Container>
            }
        </>
    )
}