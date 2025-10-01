import React from 'react';
import { useNavigate } from 'react-router';

import { Background, 
         BotaoVoltar, 
         Titulo, 
         LadoTitulo, 
         Subtitulo, 
         Logo 
} from './style';
import FormaLogin from '../../components/formaLogin/formaLogin';

export default function Login() {
    const navigate = useNavigate();

    function goToInicio() {
        navigate('/inicio');
    }

    return (
        <Background>
            <div>
                <LadoTitulo>
                    <BotaoVoltar onClick={goToInicio}>←</BotaoVoltar>
                    <Titulo>Família BR Park</Titulo>
                </LadoTitulo>

                <Subtitulo>Identifique-se para prosseguir</Subtitulo>
            </div>

            <div>
                <FormaLogin />
            </div>

            <Logo />
        </Background>
    );
}