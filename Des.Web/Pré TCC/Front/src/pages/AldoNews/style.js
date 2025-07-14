import styled from 'styled-components';

export const Background = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;
  background-color: #f8f5ec;
  font-family: Arial;
`;

export const BotaoVoltar = styled.button`
  position: absolute;
  left: 0;
  background-color: #f2c14e;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  padding: 20px;
  border: none;
  border-radius: 50%;
  margin-left: 15px;

  &:hover {
    background-color: #ffe084;
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export const Titulo = styled.h1`
  color: #436850;
  font-size: 60px;
  font-weight: bolder;
  margin-bottom: 3px;
`;

export const LadoTitulo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const Subtitulo = styled.p`
  color: #6b6b6b;
  font-size: 30px;
  font-weight: normal;
  text-align: center;
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