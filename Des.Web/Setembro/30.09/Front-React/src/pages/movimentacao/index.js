import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function IndexMovimentacao() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function fetchData() {
        setLoad(true);
        setTimeout(() => {
            Client.get('movimentacoes')
                .then(res => {
                    const movimentacoes = res.data.data.map(m => ({
                        ...m,
                        valor_formatado: new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(m.valor),
                        tipo_formatado: m.tipo === 'deposito' ? 'Depósito' : 
                                      m.tipo === 'saque' ? 'Saque' : 
                                      m.tipo === 'transferencia' ? 'Transferência' : 
                                      'Aplicação',
                        data_formatada: new Date(m.data_movimentacao).toLocaleDateString('pt-BR'),
                        conta_origem: m.conta_origem_id ? `${m.conta_origem?.numero_conta} - ${m.conta_origem?.cliente?.nome_completo}` : '—',
                        conta_destino: m.conta_destino_id ? `${m.conta_destino?.numero_conta} - ${m.conta_destino?.cliente?.nome_completo}` : '—'
                    }));
                    setData(movimentacoes);
                })
                .catch(console.error)
                .finally(() => setLoad(false));
        }, 500);
    }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.listMovimentacao === 0) navigate(-1);
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
                        title="Movimentações Registradas" 
                        rows={['Tipo', 'Valor', 'Data', 'Conta Origem', 'Conta Destino', 'Ações']}
                        hide={[false, false, false, false, false, false]}
                        data={data}
                        keys={['tipo_formatado', 'valor_formatado', 'data_formatada', 'conta_origem', 'conta_destino']} 
                        resource='movimentacoes'
                        crud={['viewMovimentacao', 'createMovimentacao', 'editMovimentacao', 'deleteMovimentacao']}
                    />
                  </Container>
            }
        </>
    )
}