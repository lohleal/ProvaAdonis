import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Modal, Button } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import { Label, Input, Select, Submit } from "./style";
import { Client } from '../../api/client';
import { getPermissions } from '../../service/PermissionService';
import { getDataUser } from '../../service/UserService';
import { State, City } from 'country-state-city'; // ✅ Importação adicionada

export default function EditCliente() {
    const location = useLocation();
    const cliente = location.state?.item;

    const [nomeCompleto, setNomeCompleto] = useState(cliente.nomeCompleto || '');
    const [email, setEmail] = useState(cliente.email || '');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState(cliente.cpf || '');
    const [cidade, setCidade] = useState(cliente.cidade || '');
    const [estado, setEstado] = useState(cliente.estado || '');
    const [rua, setRua] = useState(cliente.rua || '');
    const [numeroCasa, setNumeroCasa] = useState(cliente.numeroCasa || '');
    const [saldo, setSaldo] = useState('');
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
    const [estados, setEstados] = useState([]); // ✅ Corrigido
    const [cidades, setCidades] = useState([]); // ✅ Adicionado
    const navigate = useNavigate();
    const permissions = getPermissions();
    const dataUser = getDataUser();

    function updateCliente() {
        const upCliente = {
            nome_completo: nomeCompleto,
            email,
            cpf,
            cidade,
            estado,
            rua,
            numero_casa: numeroCasa
        };

        if (senha) {
            upCliente.senha = senha;
        }

        Client.put(`clientes/${cliente.id}`, upCliente)
            .then(() => {
                navigate('/clientes'); // navega direto sem mostrar modal
            })
            .catch(console.error);
    }

    const handleClose = () => { setShow(false); navigate('/clientes'); }

    function verifyPermission() {
        if (!dataUser) navigate('/login');
        else if (permissions.editCliente === 0) navigate(-1);
    }

    function formatCPF(value) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return value;
    }

    useEffect(() => {
        verifyPermission();
        const estadosBrasil = State.getStatesOfCountry('BR');
        setEstados(estadosBrasil);
        setTimeout(() => setLoad(false), 500);
    }, []);

    useEffect(() => {
        if (estado) {
            const cidadesEstado = City.getCitiesOfState('BR', estado);
            setCidades(cidadesEstado);
        } else {
            setCidades([]);
        }
    }, [estado]);

    return (
        <>
            <NavigationBar />
            {load
                ? <Container className="d-flex justify-content-center mt-5">
                    <OrbitProgress variant="spokes" color="#582770" size="medium" />
                </Container>
                : <Container className="mt-2">
                    <div className="row">
                        <div className="col-md-6">
                            <Label>Nome Completo</Label>
                            <Input type="text" value={nomeCompleto} onChange={e => setNomeCompleto(e.target.value)} placeholder="Digite o nome completo" />
                            <Label>Email</Label>
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite o email" />
                            <Label>Senha</Label>
                            <Input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite a senha" />
                            <Label>CPF</Label>
                            <Input type="text" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} placeholder="Digite o CPF" />
                            <Label>Saldo Inicial</Label>
                            <Input type="number" value={saldo} onChange={e => setSaldo(e.target.value)} placeholder="Digite o saldo inicial" step="0.01" />
                        </div>
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
                            <Input type="text" value={rua} onChange={e => setRua(e.target.value)} placeholder="Digite a rua" />
                            <Label>Número</Label>
                            <Input type="text" value={numeroCasa} onChange={e => setNumeroCasa(e.target.value)} placeholder="Nº" />
                        </div>
                    </div>
                    <div className="mt-3 d-flex gap-2">
                        <Submit value="Voltar" onClick={() => navigate('/clientes')} />
                        <Submit value="Alterar" onClick={updateCliente} />
                    </div>
                </Container>
            }

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualização - Cliente</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
