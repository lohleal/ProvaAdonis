import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function HomeMatricula() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.listMatricula === 0) navigate(-1);
    }

    function fetchData() {
        setLoad(true);
        Client.get('matriculas')
            .then(res => {
                const matriculas = res.data.data.map(m => ({
                    ...m,
                    aluno_nome: m.aluno?.nome || '—',
                    disciplina_nome: m.disciplina?.nome || '—',
                }));
                setData(matriculas);
            })
            .catch(console.error)
            .finally(() => setLoad(false));
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
                    <OrbitProgress variant="spokes" color="#32cd32" size="medium" />
                  </Container>
                : <Container className='mt-2'>
                    <DataTable
                        title="Matrículas Registradas"
                        rows={['Aluno', 'Disciplina', 'Ações']}
                        hide={[false, false, false]}
                        data={data}
                        keys={['aluno_nome', 'disciplina_nome']}
                        resource='matriculas'
                        crud={['viewMatricula', 'createMatricula', 'editMatricula', 'deleteMatricula']}
                    />
                </Container>
            }
        </>
    );
}