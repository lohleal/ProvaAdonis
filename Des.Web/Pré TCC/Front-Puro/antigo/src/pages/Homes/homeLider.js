import React from 'react';
import { useNavigate } from 'react-router';

import BarraLider from '../../components/barraLateral/barraLider';
import DropTitulo from '../../components/dropTitulo/dropTitulo';  
import { 
  Background, 
  Topo, 
  Titulo, 
  LadoTitulo, 
  DropTituloContainer, 
  Subtitulo, 
  Logo 
} from './style';

export default function HomeLider() {
  const navigate = useNavigate();
  const lider = "Marielle";  

  function logout() {
    navigate('/inicio');  
  }

  return (
    <Background>
      <Topo>
        <LadoTitulo>
          <Titulo>Bem-vindo</Titulo>
          <DropTituloContainer>
            <DropTitulo name={lider} onLogout={logout} /> 
          </DropTituloContainer>
        </LadoTitulo>
        
        <Subtitulo>Você tem acesso completo à gestão dos funcionários e caminhões</Subtitulo>
      </Topo>

      <BarraLider />

      <Logo />
    </Background>
  );
}
