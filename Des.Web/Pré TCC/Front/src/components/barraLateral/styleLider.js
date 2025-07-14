import styled, { keyframes } from 'styled-components';

const expandir = keyframes`
    from { width: 220px; }
    to { width: 900px; }
`;

const recolher = keyframes`
    from { width: 900px; }
    to { width: 220px; }
`;

export const Card = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    border: solid 1px #3a6e52;
    border-radius: 20px;
    width: 220px;
    height: 550px;

    &.abrir {
        animation: ${expandir} 0.4s forwards;
        display: grid;
        grid-template-columns: 20% 80%;
        gap: 40px;
        padding: 20px;
    }

    &.fechar {
        animation: ${recolher} 0.4s forwards;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const Botao = styled.button`
    background-color: #5c4033;
    color: #ffffff;
    font-size: 25px;
    font-weight: bold;
    width: 180px;
    padding: 15px;
    border: none;
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
    border: none;
    border-radius: 20px;
    &:hover {
        background-color: #517e68;
        transform: scale(1.05);
        cursor: pointer;
    }
`;

export const BotaoVoltar = styled.button`
    position: absolute;
    top: 49%;
    left: 870px;
    background-color: #f2c14e;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    padding: 20px;
    border: none;
    border-radius: 50%;
    &:hover {
        background-color: #ffe084;
        transform: scale(1.05);
        cursor: pointer;
    }
`;

export const Conteudo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

export const Label = styled.label`
    color: #436850;
    font-size: 27px;
    font-weight: bolder;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Select = styled.select`
    padding: 10px;
    font-size: 26px;
    border-radius: 10px;
    border: 1px solid #6b6b6b;
    background-color: #ffffff;
    color: #6b6b6b;
    width: 160px;
    cursor: pointer;
    &:focus {
        outline: none;
        border-color: #3a3a3a;
    }
`;

export const Option = styled.option`
    background-color: #ffffff;
    color: #6b6b6b;
    font-size: 26px;
`;

export const ArrumarFiltro = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

export const Confirmar = styled.button`
    background-color: #5c4033;
    color: #ffffff;
    font-size: 25px;
    font-weight: bold;
    padding: 20px;
    border: none;
    border-radius: 40px;
    align-self: center;
    &:hover {
        background-color: #3d2f26;
        transform: scale(1.05);
        cursor: pointer;
    }
`;