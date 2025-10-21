import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { Container, Alert } from 'react-bootstrap'
import { OrbitProgress } from 'react-loading-indicators'

import NavigationBar from '../../components/navigationbar'
import { Label, Input, Submit } from './style'
import { Client } from '../../api/client'
import { getPermissions } from '../../service/PermissionService'
import { getDataUser } from '../../service/UserService'

export default function CreateMovimentacao() {
  const [tipo, setTipo] = useState('transferencia')
  const [valor, setValor] = useState('')
  const [cpfDestino, setCpfDestino] = useState('')
  const [contaOrigemEncontrada, setContaOrigemEncontrada] = useState(null)
  const [contaDestinoEncontrada, setContaDestinoEncontrada] = useState(null)
  const [erroDestino, setErroDestino] = useState('')
  const [load, setLoad] = useState(true)

  const navigate = useNavigate()
  const permissions = getPermissions()
  const dataUser = getDataUser()

  function verifyPermission() {
    if (!dataUser) navigate('/login')
    else if (permissions.createMovimentacao === 0) navigate(-1)
  }

  async function buscarContaOrigemCliente() {
    try {
      const response = await Client.get('contasCorrentes')
      if (response.data.data && response.data.data.length > 0) {
        const contaDoUsuario = response.data.data.find(
          (c) => c.cliente?.email === dataUser.email
        )
        if (contaDoUsuario) setContaOrigemEncontrada(contaDoUsuario)
      }
    } catch {
      console.error('Erro ao buscar conta de origem')
    }
  }

  async function buscarContaDestinoPorCPF(cpf) {
    if (!cpf) {
      setContaDestinoEncontrada(null)
      setErroDestino('')
      return
    }

    try {
      const response = await Client.get('contasCorrentes')
      if (response.data.data) {
        const contaEncontrada = response.data.data.find(
          (c) => c.cliente?.cpf === cpf
        )
        if (!contaEncontrada) {
          setContaDestinoEncontrada(null)
          setErroDestino('Nenhuma conta encontrada com esse CPF.')
          return
        }

        if (contaEncontrada.cliente?.cpf === contaOrigemEncontrada?.cliente?.cpf) {
          setContaDestinoEncontrada(null)
          setErroDestino('Não é possível transferir para sua própria conta.')
          return
        }

        setContaDestinoEncontrada(contaEncontrada)
        setErroDestino('')
      }
    } catch {
      setErroDestino('Erro ao buscar conta destino pelo CPF.')
    }
  }

  async function buscarContaDestinoPorNumeroConta(numeroConta) {
    if (!numeroConta) {
      setContaDestinoEncontrada(null)
      setErroDestino('')
      return
    }

    try {
      const response = await Client.get('contasCorrentes')
      if (response.data.data) {
        const contaEncontrada = response.data.data.find(
          (c) => c.numeroConta === numeroConta
        )
        if (!contaEncontrada) {
          setContaDestinoEncontrada(null)
          setErroDestino('Nenhuma conta encontrada com esse número.')
          return
        }

        if (contaEncontrada.cliente?.cpf === contaOrigemEncontrada?.cliente?.cpf) {
          setContaDestinoEncontrada(null)
          setErroDestino('Não é possível transferir para sua própria conta.')
          return
        }

        setContaDestinoEncontrada(contaEncontrada)
        setErroDestino('')
      }
    } catch {
      setErroDestino('Erro ao buscar conta destino pelo número da conta.')
    }
  }

  useEffect(() => {
    verifyPermission()
    buscarContaOrigemCliente()
    setTimeout(() => setLoad(false), 500)
  }, [])

  useEffect(() => {
    const valorLimpo = cpfDestino.replace(/\D/g, '')

    if (valorLimpo.length === 11) {
      buscarContaDestinoPorCPF(valorLimpo)
    } else if (/^\d{4}-\d{1}$/.test(cpfDestino)) {
      buscarContaDestinoPorNumeroConta(cpfDestino)
    } else {
      setContaDestinoEncontrada(null)
      setErroDestino('')
    }
  }, [cpfDestino])

  function sendData() {
    if (!contaOrigemEncontrada) return alert('Conta de origem não encontrada.')
    if (!contaDestinoEncontrada) return alert('Informe uma chave válida.')
    if (contaOrigemEncontrada.saldo < parseFloat(valor))
      return alert('Saldo insuficiente.')

    const movimentacao = {
      tipo: tipo,
      valor: parseFloat(valor),
      conta_origem_id: contaOrigemEncontrada.id,
      conta_destino_id: contaDestinoEncontrada.id,
    }

    Client.post('movimentacoes', movimentacao)
      .then(() => navigate('/movimentacoes'))
      .catch((err) =>
        alert(err.response?.data?.message || 'Erro ao criar movimentação')
      )
  }

  return (
    <>
      <NavigationBar />
      {load ? (
        <Container className="d-flex justify-content-center mt-5">
          <OrbitProgress variant="spokes" color="#4d0f0f" size="medium" />
        </Container>
      ) : (
        <Container className="mt-3">
          <div className="col-md-6">
            <Label>Chave Pix</Label>
            <Input
              type="text"
              value={cpfDestino}
              onChange={(e) => setCpfDestino(e.target.value)}
              placeholder="Digite o número da conta"
            />
            {contaDestinoEncontrada && (
              <div variant="success" className="small py-2 mt-2">
                Conta corrente:{' '}
                <strong>{contaDestinoEncontrada.numeroConta}</strong> -{' '}
                {contaDestinoEncontrada.cliente?.nomeCompleto}
              </div>
            )}
            {erroDestino && (
              <Alert variant="danger" className="small py-2 mt-2">
                {erroDestino}
              </Alert>
            )}
          </div>
          <div className="col-md-6">
            <Label>Valor</Label>
            <Input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              step="0.01"
              min="0.01"
            />
          </div>
          {contaOrigemEncontrada && (
            <div className="small py-2">
              <titulo>Saldo:</titulo>{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(contaOrigemEncontrada.saldo)}
            </div>
          )}

          <div className="mt-3 d-flex gap-2">
            <Submit value="Voltar" onClick={() => navigate('/movimentacoes')} />
            <Submit
              value="Transferir"
              onClick={sendData}
              disabled={!valor || !cpfDestino || !contaDestinoEncontrada}
            />
          </div>
        </Container>
      )}
    </>
  )
}
