import styled from 'styled-components';

export const Card = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    border: solid 1px #3a6e52;
    border-radius: 20px;
    width: 220px;
    height: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Botao = styled.button`
    background-color: #5c4033;
    color: #ffffff;
    font-size: 25px;
    font-weight: bold;
    width: 180px;
    padding: 15px;
    border: #5c4033;
    border-radius: 20px;
    &:hover {
        background-color: #774f38;
        transform: scale(1.05);
        cursor: pointer;
    }
    &.selecionado {
        background-color: #774f38;
        width: 200px;
    }
`;

export const BotaoNews = styled.button`
    background-color: #436850;
    color: #ffffff;
    font-size: 25px;
    font-weight: bold;
    width: 180px;
    padding: 15px;
    border: #436850;
    border-radius: 20px;
    &:hover {
        background-color: #32503a;
        transform: scale(1.05);
        cursor: pointer;
    }
`;