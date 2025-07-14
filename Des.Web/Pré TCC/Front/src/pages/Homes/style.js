import styled from 'styled-components';

export const Background = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;
  background-color: #f8f5ec;
  font-family: Arial;
`;

export const Topo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Titulo = styled.h1`
  color: #436850;
  font-size: 60px;
  font-weight: bolder;
  margin-bottom: 3px;
  margin-left: auto;
  margin-right: auto;
`;

export const LadoTitulo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
`;

export const DropTituloContainer = styled.div`  // Corrigido para começar com letra maiúscula
  position: absolute;
  right: 15px;
  top: 49%;
`;

export const Subtitulo = styled.p`
  color: #6b6b6b;
  font-size: 30px;
  font-weight: normal;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const Logo = styled.div`
  background-image: url('/Images/Logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right bottom;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 220px;
  height: 220px;
`;
