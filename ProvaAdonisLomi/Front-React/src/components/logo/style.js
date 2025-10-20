import styled from 'styled-components';

export const LogoCaixa = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const LogoTitulo = styled.h1`
 background-color: #4D0F0F; // Cor de fundo
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Para garantir que o conteúdo ocupe toda a tela
  color: white; // Cor do texto
  font-size: 6rem; // Tamanho do texto
  font-family: 'Playfair Display', serif; // Fonte elegante
  font-weight: bold;
  text-transform: uppercase;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const LogoSubtitulo = styled.p`
  color:rgb(233, 192, 192);
  font-size: 18px;
  font-style: italic;
`;