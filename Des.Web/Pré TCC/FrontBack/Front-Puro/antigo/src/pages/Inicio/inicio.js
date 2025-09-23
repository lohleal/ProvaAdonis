import React from 'react';
import { useNavigate } from 'react-router';

import { Background, 
         Topo,
         Titulo, 
         Subtitulo, 
         Card, 
         Botoes, 
         Logo 
} from './style';

export default function Inicio() {
    const navigate = useNavigate();

    function goToLogin() {
        navigate('/login');
    }

    return (
        <Background>
            <Topo>
                <Titulo>Família BR Park</Titulo>
                <Subtitulo>Acesse para continuar</Subtitulo>
            </Topo>

            <Card>
                <Botoes onClick={goToLogin}>Acessar</Botoes>
            </Card>

            <Logo />
        </Background>
    );
}