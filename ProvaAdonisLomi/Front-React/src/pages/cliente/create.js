import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { Country, State, City } from 'country-state-city'; // ← import da lib

export default function CreateCliente() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [rua, setRua] = useState('');
    const [numeroCasa, setNumeroCasa] = useState('');
    const [saldo, setSaldo] = useState('');
    const [load, setLoad] = useState(true);
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);

    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.createCliente === 0) navigate(-1);
    }

    // 🔹 Carrega os estados do Brasil ao iniciar
    useEffect(() => {
        verifyPermission();

        const estadosBrasil = State.getStatesOfCountry('BR');
        setEstados(estadosBrasil);

        // Simula carregamento
        setTimeout(() => setLoad(false), 500);
    }, []);

    // 🔹 Atualiza as cidades quando o estado muda
    useEffect(() => {
        if (estado) {
            const cidadesEstado = City.getCitiesOfState('BR', estado);
            setCidades(cidadesEstado);
        } else {
            setCidades([]);
        }
    }, [estado]);

    function sendData() {
        const cliente = {
            nome_completo: nomeCompleto,
            email,
            senha,
            cpf,
            cidade,
            estado,
            rua,
            numero_casa: numeroCasa,
            saldo: saldo ? parseFloat(saldo) : 0,
        };
        console.log('Cliente payload no frontend (antes de enviar):', cliente);
        Client.post('clientes', cliente)
            .then(() => navigate('/clientes'))
            .catch(console.error);
    }

    function formatCPF(value) {
        // Remove tudo que não for número
        value = value.replace(/\D/g, '');

        // Aplica a formatação 000.000.000-00
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        return value;
    }


    return (
        <>
            <NavigationBar />
            {load
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#4d0f0f" size="medium" />
                </Container>
                : <Container className="mt-2">
                    <div className="row">
                        {/* Coluna 1 - Dados pessoais */}
                        <div className="col-md-6">
                            <Label>Nome Completo</Label>
                            <Input
                                type="text"
                                value={nomeCompleto}
                                onChange={e => setNomeCompleto(e.target.value)}
                                placeholder="Digite o nome completo"
                            />

                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Digite o email"
                            />

                            <Label>Senha</Label>
                            <Input
                                type="password"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                placeholder="Digite a senha"
                            />

                            <Label>CPF</Label>
                            <Input
                                type="text"
                                value={cpf}
                                onChange={e => setCpf(formatCPF(e.target.value))}
                                placeholder="Digite o CPF"
                            />

                            <Label>Saldo Inicial</Label>
                            <Input
                                type="number"
                                value={saldo}
                                onChange={e => setSaldo(e.target.value)}
                                placeholder="Digite o saldo inicial"
                                step="0.01"
                            />
                        </div>

                        {/* Coluna 2 - Endereço */}
                        <div className="col-md-6">
                            <Label>ENDEREÇO</Label>
                            <Label>Estado</Label>
                            <Select value={estado} onChange={e => setEstado(e.target.value)}>
                                <option value="">Selecione o estado</option>
                                {estados.map(uf => (
                                    <option key={uf.isoCode} value={uf.isoCode}>
                                        {uf.name} ({uf.isoCode})
                                    </option>
                                ))}
                            </Select>

                            <Label>Cidade</Label>
                            <Select value={cidade} onChange={e => setCidade(e.target.value)}>
                                <option value="">Selecione a cidade</option>
                                {cidades.map(c => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </Select>

                            <Label>Rua</Label>
                            <Input
                                type="text"
                                value={rua}
                                onChange={e => setRua(e.target.value)}
                                placeholder="Digite a rua"
                            />

                            <Label>Número</Label>
                            <Input
                                type="text"
                                value={numeroCasa}
                                onChange={e => setNumeroCasa(e.target.value)}
                                placeholder="Nº"
                            />
                        </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/clientes')} />
                        <Submit value="Cadastrar" onClick={sendData} />
                    </div>
                </Container>

            }
        </>
    );
}
