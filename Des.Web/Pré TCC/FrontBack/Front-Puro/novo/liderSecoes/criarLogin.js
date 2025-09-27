export function iniciarCriarLogin() {
    // Array para armazenar os logins (CPF e senha)
    let logins = [
        { 
            cpf: '123.456.789-00', 
            senha: '••••••', // Senha mascarada
            dataCriacao: '2024-01-15T10:30:00',
        },
        { 
            cpf: '987.654.321-00', 
            senha: '••••••',
            dataCriacao: '2024-01-14T14:20:00', 
        }
    ];

    // Seleciona elementos do DOM
    const tabelaBody = document.querySelector('#tabelaLogin tbody');
    const pesquisaInput = document.getElementById('pesquisaLogin');
    
    // Modais
    const modalCriarLogin = document.getElementById('modalCriarLoginForm');
    const modalRedefinirSenha = document.getElementById('modalRedefinirSenha');
    const modalRemoverLogin = document.getElementById('modalRemoverLogin');

    // Campos dos modais
    const cpfLogin = document.getElementById('cpfLogin');
    const senhaLogin = document.getElementById('senhaLogin');
    const confirmarSenha = document.getElementById('confirmarSenha');
    const confirmarCriarLogin = document.getElementById('confirmarCriarLogin');
    
    const cpfRedefinir = document.getElementById('cpfRedefinir');
    const novaSenha = document.getElementById('novaSenha');
    const confirmarNovaSenha = document.getElementById('confirmarNovaSenha');
    const confirmarRedefinir = document.getElementById('confirmarRedefinir');
    
    const textoRemoverLogin = document.getElementById('textoRemoverLogin');
    const confirmarRemoverLogin = document.getElementById('confirmarRemoverLogin');

    let loginSelecionadoIndex = null;

    // Função para mostrar modal de erro
    function mostrarAlgo(mensagem) {
        let mostrarAlgo = document.getElementById('mostrarAlgo');
        
        if (!mostrarAlgo) {
            mostrarAlgo = document.createElement('div');
            mostrarAlgo.id = 'mostrarAlgo';
            mostrarAlgo.className = 'modal-algo';
            document.body.appendChild(mostrarAlgo);
        }
        
        mostrarAlgo.textContent = mensagem;
        mostrarAlgo.classList.add('show');

        setTimeout(() => {
            mostrarAlgo.classList.remove('show');
        }, 3000);
    }

    // Função para verificar se CPF já existe 
    function cpfExiste(cpf, indexIgnorar = null) {
        // Normalizar CPF (remover formatação para comparação)
        const cpfNormalizado = cpf.replace(/\D/g, '');
        
        return logins.some((login, index) => {
            if (indexIgnorar !== null && index === indexIgnorar) {
                return false; // Ignorar o próprio registro durante a atualização
            }
            
            // Normalizar CPF do login para comparação
            const cpfLoginNormalizado = login.cpf.replace(/\D/g, '');
            return cpfLoginNormalizado === cpfNormalizado;
        });
    }

    // Função para formatar CPF
    function formatarCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');
        
        // Aplica a formatação apenas se tiver 11 dígitos
        if (cpf.length === 11) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return cpf;
    }

    // Função para abrir modal
    function abrirModal(modal) {
        console.log('Abrindo modal:', modal.id);
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Abrir modal de criar login
    function abrirCriarLogin() {
        if (cpfLogin) cpfLogin.value = '';
        if (senhaLogin) senhaLogin.value = '';
        if (confirmarSenha) confirmarSenha.value = '';
        abrirModal(modalCriarLogin);
    }

    // Abrir modal de redefinir senha
    function abrirRedefinirSenha(index) {
        loginSelecionadoIndex = index;
        const login = logins[index];
        
        if (cpfRedefinir) cpfRedefinir.value = login.cpf;
        if (novaSenha) novaSenha.value = '';
        if (confirmarNovaSenha) confirmarNovaSenha.value = '';
        
        abrirModal(modalRedefinirSenha);
    }

    // Abrir modal de remover login
    function abrirRemoverLogin(index) {
        loginSelecionadoIndex = index;
        const login = logins[index];
        
        if (textoRemoverLogin) {
            textoRemoverLogin.textContent = `Deseja remover o login do CPF ${login.cpf}?`;
        }
        abrirModal(modalRemoverLogin);
    }

    // Formatador de data
    function formatarData(dataString) {
        if (!dataString) return '';
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR');
    }

    // Renderizar tabela
    function renderizarTabela(lista) {
        if (!tabelaBody) {
            console.error('Tabela body não encontrada');
            return;
        }
        
        tabelaBody.innerHTML = '';
        lista.forEach((login, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${login.cpf}</td>
                <td>${formatarData(login.dataCriacao)}</td>
                <td>
                    <button class="botao-acao redefinir-login" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#fff">
                            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                        </svg>
                    </button>
                    <button class="botao-acao remover-login" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </button>
                </td>
            `;
            tabelaBody.appendChild(row);
        });

        // Adicionar event listeners aos botões
        adicionarEventListenersBotoes();
    }

    // Adicionar event listeners aos botões
    function adicionarEventListenersBotoes() {
        // Botões de redefinir senha
        document.querySelectorAll('.redefinir-login').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirRedefinirSenha(index);
            });
        });

        // Botões de remover login
        document.querySelectorAll('.remover-login').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirRemoverLogin(index);
            });
        });
    }

    // Configurar event listeners principais
    function configurarEventListeners() {
        // Pesquisa
        if (pesquisaInput) {
            pesquisaInput.addEventListener('input', () => {
                const filtro = pesquisaInput.value.toLowerCase();
                const listaFiltrada = logins.filter(l =>
                    l.cpf.includes(filtro)
                );
                renderizarTabela(listaFiltrada);
            });
        }

        // Botão criar login
        const botaoCriarLogin = document.getElementById('abrirCriarLogin');
        if (botaoCriarLogin) {
            botaoCriarLogin.addEventListener('click', () => {
                abrirCriarLogin();
            });
        }

        // Confirmar criar login - MODIFICADA (validação simplificada)
        if (confirmarCriarLogin) {
            confirmarCriarLogin.addEventListener('click', () => {
                const cpf = cpfLogin ? cpfLogin.value.trim() : '';
                const senha = senhaLogin ? senhaLogin.value.trim() : '';
                const confirmacaoSenha = confirmarSenha ? confirmarSenha.value.trim() : '';

                // Validar campos obrigatórios
                if (!cpf || !senha || !confirmacaoSenha) {
                    mostrarAlgo('Preencha todos os campos');
                    return;
                }

                // Verificar se CPF já existe (usando a nova função)
                if (cpfExiste(cpf)) {
                    mostrarAlgo('CPF já possui login cadastrado');
                    return;
                }

                // Validar se senhas coincidem
                if (senha !== confirmacaoSenha) {
                    mostrarAlgo('As senhas não coincidem');
                    return;
                }
                
                // Validar força da senha
                if (senha.length < 6) {
                    mostrarAlgo('A senha deve ter pelo menos 6 caracteres');
                    return;
                }
                
                // Format CPF para consistência
                const cpfFormatado = formatarCPF(cpf);
                
                // Adicionar novo login
                logins.push({
                    cpf: cpfFormatado,
                    senha: '••••••', // Senha mascarada
                    dataCriacao: new Date().toISOString(),
                    status: 'Ativo'
                });
                
                renderizarTabela(logins);
                window.fecharModal('modalCriarLoginForm');
            });
        }

        // Confirmar redefinir senha
        if (confirmarRedefinir) {
            confirmarRedefinir.addEventListener('click', () => {
                if (loginSelecionadoIndex !== null) {
                    if (novaSenha && novaSenha.value && 
                        confirmarNovaSenha && confirmarNovaSenha.value) {
                        
                        if (novaSenha.value !== confirmarNovaSenha.value) {
                            mostrarAlgo('As senhas não coincidem');
                            return;
                        }
                        
                        if (novaSenha.value.length < 6) {
                            mostrarAlgo('A senha deve ter pelo menos 6 caracteres');
                            return;
                        }
                        
                        logins[loginSelecionadoIndex].senha = '••••••'; // Senha mascarada
                        logins[loginSelecionadoIndex].dataCriacao = new Date().toISOString();
                        
                        renderizarTabela(logins);
                        window.fecharModal('modalRedefinirSenha');
                        mostrarAlgo('Senha redefinida com sucesso!');
                    } else {
                        mostrarAlgo('Preencha todos os campos');
                    }
                }
            });
        }

        // Confirmar remover login
        if (confirmarRemoverLogin) {
            confirmarRemoverLogin.addEventListener('click', () => {
                if (loginSelecionadoIndex !== null) {
                    logins.splice(loginSelecionadoIndex, 1);
                    renderizarTabela(logins);
                    window.fecharModal('modalRemoverLogin');
                    loginSelecionadoIndex = null;
                }
            });
        }
    }

    // Inicializar
    renderizarTabela(logins);
    configurarEventListeners();
}