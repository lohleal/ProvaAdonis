import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function CreateAluno() {
    const [nome, setNome] = useState('');
    const [cursoId, setCursoId] = useState('');
    const [cursos, setCursos] = useState([]);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function fetchData() {
        setLoad(true);
        setTimeout(() => {
            Client.get('cursos') 
                .then(res => setCursos(res.data.data))
                .catch(console.error)
                .finally(() => setLoad(false));
        }, 500);
    }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.createAluno === 0) navigate(-1);
    }

    useEffect(() => {
        verifyPermission();
        fetchData();
    }, []);

    function sendData() {
        const aluno = { nome, curso_id: cursoId };
        Client.post('alunos', aluno)
            .then(() => navigate('/alunos'))
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
                    <div>
                        <div className="flex-grow-1">
                            <Label>Nome</Label>
                            <Input
                                type="text" 
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Curso</Label>
                            <Select value={cursoId} onChange={e => setCursoId(e.target.value)}>
                                <option value="">Selecione o curso</option>
                                {cursos.map(c => (
                                    <option key={c.id} value={c.id}>{c.nome}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="mt-3">
                        <Submit value="Voltar" onClick={() => navigate('/alunos')} />
                        <Submit value="Cadastrar" onClick={sendData} />
                    </div>
                  </Container>
            }
        </>
    );
}
