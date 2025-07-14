import React from 'react';
import { useNavigate } from 'react-router';

import BarraFuncionario from '../../components/barraLateral/barraFuncionario';
import DropTitulo from '../../components/dropTitulo/dropTitulo';  
import { 
  Background, 
  Topo, 
  Titulo, 
  LadoTitulo, 
  dropTituloContainer, 
  Subtitulo, 
  Logo 
} from './style';

export default function HomeFuncionario() {
  const navigate = useNavigate();
  const Funcionario = "Analice";  

  function logout() {
    navigate('/inicio');  
  }

  return (
    <Background>
      <Topo>
        <LadoTitulo>
          <Titulo>Bem-vindo</Titulo>
          <dropTituloContainer>
            <DropTitulo name={Funcionario} onLogout={logout} /> 
          </dropTituloContainer>
        </LadoTitulo>
        
        <Subtitulo>Registre e acompanhe o movimento no pátio</Subtitulo>
      </Topo>

      <BarraFuncionario />

      <Logo />
    </Background>
  );
}
