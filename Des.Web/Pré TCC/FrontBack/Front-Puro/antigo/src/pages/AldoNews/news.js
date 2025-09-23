import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import Carrossel from '../../components/carrossel/carrossel'; 

import { 
  Background,
  BotaoVoltar, 
  Titulo, 
  LadoTitulo, 
  Subtitulo, 
  Logo 
} from './style';

export default function News() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const username = location.state?.username || 'default';

  function goToHome() {
    if (username === 'Marielle') {
      navigate('/homeLider');
    } else if (username === 'Analice') {
      navigate('/homeFuncionario');
    } else {
      navigate('/'); 
    }
  }

  return (
    <Background>
      <div>
        <LadoTitulo>
          <BotaoVoltar onClick={goToHome}>←</BotaoVoltar>
          <Titulo>Família BR Park</Titulo>
        </LadoTitulo>

        <Subtitulo>Atualizações importantes para motoristas</Subtitulo>
      </div>

      <div>
        <Carrossel />
      </div>

      <Logo />
    </Background>
  );
}