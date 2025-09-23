import styled from 'styled-components';

export const Titulo = styled.span`
    color: #5c4033;
    font-weight: bold;
    font-size: 30px;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ItemDropdown = styled.div`
  padding: 8px 16px;
  color: #5c4033;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;