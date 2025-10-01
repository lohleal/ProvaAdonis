import styled from 'styled-components';

export const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border: solid 1px #436850;
  border-radius: 20px;

  margin-left: auto;
  margin-right: auto;

  width: 1000px;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 30px;
`;

export const InputIdentificacao = styled.input`
  border: solid 3px #436850;
  border-radius: 40px;
  padding: 20px;

  font-size: 18px;
  color: #6b6b6b;

  width: 500px;
  height: 6vh;

  &:focus {
    outline: none;
    border-color: #436850;
    transform: scale(1.05);
  }
`;

export const InputPassword = styled.input`
  border: solid 3px #436850;
  border-radius: 40px;
  padding: 20px;

  font-size: 18px;
  color: #6b6b6b;

  width: 500px;
  height: 6vh;

  &:focus {
    outline: none;
    border-color: #436850;
    transform: scale(1.05);
  }
`;

export const Botao = styled.button`
  background-color: #5c4033;
  color: #ffffff;

  font-size: 25px;
  font-weight: bold;

  padding: 20px;
  border: none;
  border-radius: 40px;

  align-self: flex-start;
  margin-left: 250px;

  &:hover {
    background-color: #774f38;
    transform: scale(1.05);
    cursor: pointer;
  }
`;