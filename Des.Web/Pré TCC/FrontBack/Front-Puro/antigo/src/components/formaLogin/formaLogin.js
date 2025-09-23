import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, InputIdentificacao, InputPassword, Botao } from "./style";

export default function FormaLogin() {
  const [identificacao, setIdentificacao] = useState('');
  const [password, setPassword] = useState('');

  const lider = {
    identificacao: 'Líder',
    password: '20031996',
  };

  const funcionario = {
    identificacao: '1234',
    password: '1234',
  };

  const navigate = useNavigate();

  function goToHome() {
    if (identificacao === lider.identificacao && password === lider.password) {
      navigate('/homeLider');
    } else if (identificacao === funcionario.identificacao && password === funcionario.password) {
      navigate('/homeFuncionario');
    } else {
      alert('Nome ou senha incorretos');
    }
  }

  return (
    <Card>
      <InputIdentificacao
        type="text"
        placeholder="Digite sua identificação"
        value={identificacao}
        onChange={(e) => setIdentificacao(e.target.value)}
      />
      <InputPassword
        type="password"
        placeholder="Digite a senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Botao onClick={goToHome}>Confirmar</Botao>
    </Card>
  );
}