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

export const Subtitulo = styled.p`
  color: #6b6b6b;
  font-size: 30px;
  font-weight: normal;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border: solid 1px #436850;
  border-radius: 20px;
  gap: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  height: 550px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Botoes = styled.button`
  background-color: #5c4033;
  color: #ffffff;
  font-size: 35px;
  font-weight: bold;
  padding: 20px;
  border: none;
  border-radius: 30px;
  
  &:hover {
    background-color: #774f38;
    transform: scale(1.05);
    cursor: pointer;
  }
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