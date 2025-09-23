import styled from 'styled-components';

export const ContainerPesquisa = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 5px;
`;

export const BotaoEspacado = styled.div`
  margin-left: 350px;
`;

export const InputPesquisa = styled.input`
  border: solid 3px #436850;
  border-radius: 40px;
  padding: 8px 20px;
  font-size: 17px;
  color: #6b6b6b;

  &:focus {
    outline: none;
    border-color: #436850;
    transform: scale(1.05);
  }
`;

export const IconePesquisa = styled.svg`
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const BotaoAcao = styled.button`
  background-color: #5c4033;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-right: 5px;

  &:hover {
    background-color: #3d2f26;
    transform: scale(1.05);
  }

  svg {
    fill: #fff;
  }
`;

export const ModalCentralizado = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1000px;
  max-height: 100vh;
  width: 90%;
  overflow: auto;
  background-color: #fdf6e3;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
  font-size: 17px;
  color: #5c4033;
`;

export const BotaoFechar = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    fill: #5c4033;
    width: 30px;
    height: 30px;
  }

  &:hover svg {
    fill: #3d2f26;
    transform: scale(1.1);
  }
`;

export const TabelaEstilizada = styled.div`
  table {
    width: 100%;
    background-color: #fdf6e3;

    th, td {
      padding: 16px;
      font-size: 16px;
      color: #5c4033;
    }
  }
`;

export const ModalFundoTransparente = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormularioModal = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const Label = styled.label`
  color: #436850;
  font-size: 17px;
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  align-items: 'center';
`;

export const InputModal = styled.input`
  border: solid 3px #436850;
  border-radius: 40px;
  padding: 8px 20px;
  font-size: 16px;
  color: #6b6b6b;

  width: 300px;

  &:focus {
    outline: none;
    border-color: #436850;
    transform: scale(1.05);
  }
`;

export const Select = styled.select`
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #6b6b6b;
  background-color: #ffffff;
  color: #6b6b6b;
  width: 160px;
  cursor: pointer;

  width: 200px;

  &:focus {
    outline: none;
    border-color: #3a3a3a;
  }
`;

export const Option = styled.option`
  background-color: #ffffff;
  color: #6b6b6b;
  font-size: 16px;
`;

export const LabelTextarea = styled.label`
  color: #436850;
  font-size: 17px;
  font-weight: bolder;

  textarea {
    border: solid 1px #436850;
    padding: 20px;
    font-size: 16px;
    color: #6b6b6b;
    width: 100%;
    resize: none;
  }

  textarea:focus {
    outline: none;
    border-color: #436850;
    transform: scale(1.05);
  }
`;

export const Confirmar = styled.button`
  background-color: #5c4033;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
  width: 300px;
  border: none;
  border-radius: 40px;
  align-self: center;

  &:hover {
    background-color: #3d2f26;
    transform: scale(1.05);
    cursor: pointer;
  }
`;