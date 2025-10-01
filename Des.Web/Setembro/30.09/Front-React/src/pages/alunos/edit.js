import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Button } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function EditAluno() {
    const location = useLocation();
    const aluno = location.state?.item;

    const [nome, setNome] = useState(aluno.nome);
    const [cursoId, setCursoId] = useState(aluno.curso_id);
    const [cursos, setCursos] = useState([]);
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
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

    function updateAluno() {
        const upAluno = { nome, curso_id: cursoId };
        Client.put(`alunos/${aluno.id}`, upAluno)
            .then(() => setShow(true))
            .catch(console.error);
    }

    const handleClose = () => { setShow(false); navigate('/alunos'); }

    function verifyPermission() {
        if(!dataUser) navigate('/login');
        else if(permissions.editAluno === 0) navigate(-1);
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
                    <div className="d-flex gap-3 align-items-end">
                        <div className="flex-grow-1">
                            <Label>Nome</Label>
                            <Input type="text" value={nome} onChange={e => setNome(e.target.value)} />
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
                        <Submit value="Alterar" onClick={updateAluno} />
                    </div>
                  </Container>
            }

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualização - Aluno</Modal.Title>
                </Modal.Header>
                <Modal.Body>Operação Efetuada com Sucesso!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
