import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import NavigationBar from '../../components/navigationbar';
import { 
    Label,
    Input,
    Submit,
} from "./style"
import { Client } from '../../api/client';
// import UserContext from '../../contexts/UserContext'
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';

export default function Edit() {

    const location = useLocation();
    const curso = location.state?.item;

    const [name, setName] = useState(curso.nome)
    const [duration, setDuration] = useState(curso.duracao)
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    // const { user } = useContext(UserContext);
    const permissions = getPermissions()
    const dataUser  = getDataUser()

    function updateCurso() {

        const upCurso = { nome: name, duracao: duration }
        
        Client.put("cursos/" + curso.id, upCurso).then(response => {
            setShow(true);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleClose = () => {
        setShow(false)
        navigate('/cursos')
    }

    function verifyPermission() {
        // Não Autenticado   
        if(!dataUser) navigate('/login')
        // Não Autorizado (rota anterior)
        else if(permissions.editCurso === 0) navigate(-1)
    }

    useEffect(() => {
        verifyPermission()
    }, []);

    return (
        <>
            <NavigationBar />
            <Container className='mt-2'>
                <Label>Nome</Label>
                 <Input
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label>Duração (anos)</Label>
                 <Input
                    type="number" 
                    id="duration" 
                    name="duration" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <Submit value="Voltar" onClick={() => navigate('/cursos')  }/>
                <Submit value="Alterar" onClick={() => updateCurso() }/>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Atualização - Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>Operação Efetuda com Sucesso!!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
    
}