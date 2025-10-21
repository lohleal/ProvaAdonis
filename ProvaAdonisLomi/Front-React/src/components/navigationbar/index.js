import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Image } from "./style";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import DropTitle from "../droptitle";
import Banco_logo from '../../images/Banco_logo.png';
import logo from '../../images/logo.jpeg';

import UserContext from '../../contexts/UserContext';
import { Client, removeToken } from '../../api/client';
import { removePermissions } from '../../service/PermissionService';
import { getDataUser, removeDataUser } from '../../service/UserService';

function NavigationBar() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const dataUser = getDataUser();

    function logout() {
        setTimeout(() => {
            Client.post('auth/logout')
                .then(res => {
                    removeToken();
                    removePermissions();
                    removeDataUser();
                    navigate('/login');
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                });
        }, 1000);
    }

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#f1ececff' }}>

            <Container fluid>
                <Navbar.Brand href="#">
                    <Image src={logo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="my-2 my-lg-0 d-flex align-items-center justify-content-center"
                        style={{ maxHeight: '100px', gap: '32px', width: '100%' }}
                        navbarScroll
                    >

                        <Nav.Link
                            onClick={() => navigate('/clientes')}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#4D0F0F" viewBox="0 -960 960 960">
                                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                            </svg>
                            <span className="ms-2 fw-bolder" style={{ color: '#4D0F0F', opacity: 0.7 }}>
                                Clientes
                            </span>
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => navigate('/contasCorrentes')}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4D0F0F">
                                <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
                            </svg>
                            <span className="ms-2 fw-bolder" style={{ color: '#4D0F0F', opacity: 0.7 }}>
                                Contas Correntes
                            </span>
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => navigate('/movimentacoes')}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#4D0F0F">
                                <path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40Zm-36-160v-52q-47-11-76.5-40.5T324-370l66-26q12 41 37.5 61.5T486-314q33 0 56.5-15.5T566-378q0-29-24.5-47T454-466q-59-21-86.5-50T340-592q0-41 28.5-74.5T446-710v-50h70v50q36 3 65.5 29t40.5 61l-64 26q-8-23-26-38.5T482-648q-35 0-53.5 15T410-592q0 26 23 41t83 35q72 26 96 61t24 77q0 29-10 51t-26.5 37.5Q583-274 561-264.5T514-250v50h-70ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Z" />
                            </svg>
                            <span className="ms-2 fw-bolder" style={{ color: '#4D0F0F', opacity: 0.7 }}>
                                Movimentações
                            </span>
                        </Nav.Link>

                        
                    </Nav>

                    <NavDropdown
                        title={<DropTitle text={dataUser ? dataUser.fullName : 'Visitante'} />}
                        id="navbarScrollingDropdown"
                        className="me-5"
                    >
                        <NavDropdown.Item href="#" className="me-5">
                            {dataUser ? dataUser.email : 'visitante@gmail.com'}
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => logout()} className="me-5">
                            Sair
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;



