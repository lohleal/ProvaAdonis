import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Select, Submit } from "./style"; 
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateMatricula() {
    const navigate = useNavigate();
    const location = useLocation();
    const preAluno = location.state?.aluno;

    const [alunos, setAlunos] = useState([]);
    const [alunoId, setAlunoId] = useState(preAluno?.id || '');
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinaId, setDisciplinaId] = useState('');
    const [load, setLoad] = useState(true);

    const permissions = getPermissions();
    const dataUser = getDataUser();

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createMatricula === 0) navigate(-1);
    }

    // Buscar alunos
    function fetchAlunos() {
        Client.get('alunos')
            .then(res => {
                setAlunos(res.data.data);
                fetchDisciplinas();
            })
            .catch(console.error)
            .finally(() => setLoad(false));
    }

    // Buscar todas as disciplinas (sem filtrar por curso)
    function fetchDisciplinas() {
        Client.get('disciplinas')
            .then(res => setDisciplinas(res.data.data))
            .catch(console.error);
    }

    useEffect(() => {
        verifyPermission();
        setLoad(true);
        fetchAlunos();
    }, []);

    function sendData() {
        const matricula = { aluno_id: alunoId, disciplina_id: disciplinaId };
        Client.post('matriculas', matricula)
            .then(() => navigate('/matriculas'))
            .catch(console.error);
    }

    return (
        <>
            <NavigationBar />
            {load
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#32cd32" size="medium" />
                  </Container>
                : <Container className='mt-2'>
                    <Label>Aluno</Label>
                    <Select
                        value={alunoId}
                        onChange={e => setAlunoId(e.target.value)}
                    >
                        <option value="">Selecione o aluno</option>
                        {alunos.map(a => (
                            <option key={a.id} value={a.id}>{a.nome}</option>
                        ))}
                    </Select>

                    <Label>Disciplina</Label>
                    <Select
                        value={disciplinaId}
                        onChange={e => setDisciplinaId(e.target.value)}
                        disabled={!disciplinas.length}
                    >
                        <option value="">Selecione a disciplina</option>
                        {disciplinas.map(d => (
                            <option key={d.id} value={d.id}>{d.nome}</option>
                        ))}
                    </Select>

                    <div className="mt-3">
                        <Submit value="Voltar" onClick={() => navigate('/matriculas')} />
                        <Submit value="Cadastrar" onClick={sendData} />
                    </div>
                </Container>
            }
        </>
    );
}