import { useNavigate } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
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

export default function Create() {

    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    const navigate = useNavigate();
    // const { user } = useContext(UserContext);
    const permissions = getPermissions()
    const dataUser  = getDataUser()
    
    function sendData() {

        const user = { nome: name, duracao: duration }
        // console.log(user)

        Client.post('cursos', user).then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        navigate('/cursos')
    }

    function verifyPermission() {
       // Não Autenticado   
        if(!dataUser) navigate('/login')
        // Não Autorizado (rota anterior)
        else if(permissions.createCurso === 0) navigate(-1)
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
                <Submit value="Cadastrar" onClick={() => sendData() }/>
             </Container>
        </>
    )
    
}