import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Button } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function EditMatricula() {
    const location = useLocation();
    const matricula = location.state?.item;

    const [alunos, setAlunos] = useState([]);
    const [alunoId, setAlunoId] = useState(matricula.aluno_id);
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinaId, setDisciplinaId] = useState(matricula.disciplina_id);
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.editMatricula === 0) navigate(-1);
    }

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

    function updateMatricula() {
        const upMatricula = { aluno_id: alunoId, disciplina_id: disciplinaId };
        Client.put(`matriculas/${matricula.id}`, upMatricula)
            .then(() => setShow(true))
            .catch(console.error);
    }

    const handleClose = () => {
        setShow(false);
        navigate('/matriculas');
    }

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
                        </div>

                        <div>
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
                        </div>
                    </div>

                    <div className="mt-3">
                        <Submit value="Voltar" onClick={() => navigate('/matriculas')} />
                        <Submit value="Alterar" onClick={updateMatricula} />
                    </div>
                </Container>
            }

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualização - Matrícula</Modal.Title>
                </Modal.Header>
                <Modal.Body>Operação Efetuada com Sucesso!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}