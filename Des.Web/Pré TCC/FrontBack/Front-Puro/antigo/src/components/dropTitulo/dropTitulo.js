import React, { useState } from 'react';
import { Container, Titulo, ItemDropdown } from './style';

export default function DropTitulo({ name, onLogout }) {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  function alternarDropdown() {
    setMostrarDropdown(!mostrarDropdown);
  }

  return (
    <div style={{ position: 'relative' }}>
      <Container onClick={alternarDropdown}>
        <Titulo>{name}</Titulo>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#5c4033" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
        </svg>
      </Container>

      {mostrarDropdown && (
        <div style={{
          position: 'absolute',
          right: 0,
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          minWidth: '150px',
          padding: '5px',
          marginTop: '10px',
        }}>
          
          <ItemDropdown onClick={onLogout}>Dados</ItemDropdown>
          <ItemDropdown onClick={onLogout}>Sair</ItemDropdown>
        </div>
      )}
    </div>
  );
}