import styled from 'styled-components';

export const Background = styled.div `
    background:rgb(255, 255, 255);
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    min-width: 100%;
    min-height: 100vh;
    background: #582770;
    box-sizing: border-box;

    @media (max-width: 800px) {
        grid-template-columns: 1fr; 
    }
`;