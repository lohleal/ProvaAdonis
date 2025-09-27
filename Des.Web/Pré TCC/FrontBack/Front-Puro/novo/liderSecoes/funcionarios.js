export function iniciarFuncionarios() {
    let funcionarios = [
        { cpf: '123.456.789-00', nome: 'Marielle', sobrenome: 'Silva', telefone: '(11) 98765-4321' },
        { cpf: '987.654.321-00', nome: 'Analice', sobrenome: 'Santos', telefone: '(21) 91234-5678' }
    ];

    // Seleciona elementos do DOM
    const tabelaBody = document.querySelector('#tabelaFuncionarios tbody');
    const pesquisaInput = document.getElementById('pesquisa');
    
    // Modais
    const modalAdicionar = document.getElementById('modalAdicionarFunc');
    const modalAtualizar = document.getElementById('modalAtualizarFunc');
    const modalRemover = document.getElementById('modalRemoverFunc');

    // Campos dos modais
    const cpfInput = document.getElementById('cpfInput');
    const nomeInput = document.getElementById('nomeInput');
    const sobrenomeInput = document.getElementById('sobrenomeInput');
    const telefoneInput = document.getElementById('telefoneInput');
    const confirmarAdicionar = document.getElementById('confirmarAdicionar');
    
    const nomeUpdate = document.getElementById('nomeUpdate');
    const sobrenomeUpdate = document.getElementById('sobrenomeUpdate');
    const telefoneUpdate = document.getElementById('telefoneUpdate');
    const confirmarAtualizar = document.getElementById('confirmarAtualizar');
    
    const textoRemover = document.getElementById('textoRemover');
    const confirmarRemover = document.getElementById('confirmarRemover');

    let funcionarioSelecionadoIndex = null;

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

    // Função para validar campos obrigatórios - CORRIGIDA
    function validarCamposObrigatorios(cpf, nome, sobrenome) {
        if (!cpf || !nome || !sobrenome) {
            if (!cpf && !nome && !sobrenome) {
                return 'CPF, nome e sobrenome são obrigatórios';
            } else if (!cpf && !nome) {
                return 'CPF e nome são obrigatórios';
            } else if (!cpf && !sobrenome) {
                return 'CPF e sobrenome são obrigatórios';
            } else if (!nome && !sobrenome) {
                return 'Nome e sobrenome são obrigatórios';
            } else if (!cpf) {
                return 'CPF é obrigatório';
            } else if (!nome) {
                return 'Nome é obrigatório';
            } else {
                return 'Sobrenome é obrigatório';
            }
        }
        return null;
    }

    // Função para verificar se CPF já existe 
function cpfExiste(cpf, indexIgnorar = null) {
    // Normalizar CPF (remover formatação para comparação)
    const cpfNormalizado = cpf.replace(/\D/g, '');
    
    return funcionarios.some((funcionario, index) => {
        if (indexIgnorar !== null && index === indexIgnorar) {
            return false; // Ignorar o próprio registro durante a atualização
        }
        
        // Normalizar CPF do funcionário para comparação
        const cpfFuncionarioNormalizado = funcionario.cpf.replace(/\D/g, '');
        return cpfFuncionarioNormalizado === cpfNormalizado;
    });
}

// Função para formatar CPF (melhorada)
function formatarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Aplica a formatação apenas se tiver 11 dígitos
    if (cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
}

    // Função para juntar nome e sobrenome
    function juntarNomeSobrenome(nome, sobrenome) {
        return `${nome} ${sobrenome}`.trim();
    }

    // Função para separar nome completo em nome e sobrenome
    function separarNomeCompleto(nomeCompleto) {
        const partes = nomeCompleto.split(' ');
        const nome = partes[0];
        const sobrenome = partes.slice(1).join(' ');
        return { nome, sobrenome };
    }

    // Função para abrir modal
    function abrirModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Abrir modal de atualizar 
    function abrirAtualizar(index) {
        funcionarioSelecionadoIndex = index;
        const f = funcionarios[index];
        
        // Separar nome completo em nome e sobrenome
        const { nome, sobrenome } = separarNomeCompleto(f.nome);
        
        if (nomeUpdate) nomeUpdate.value = nome;
        if (sobrenomeUpdate) sobrenomeUpdate.value = sobrenome;
        if (telefoneUpdate) telefoneUpdate.value = f.telefone;
        
        abrirModal(modalAtualizar);
    }

    // Abrir modal de remover
    function abrirRemover(index) {
        funcionarioSelecionadoIndex = index;
        if (textoRemover) {
            textoRemover.textContent = `Deseja remover o funcionário ${funcionarios[index].nome}?`;
        }
        abrirModal(modalRemover);
    }

    // Renderizar tabela
    function renderizarTabela(lista) {
        tabelaBody.innerHTML = '';
        lista.forEach((funcionario, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${funcionario.cpf}</td>
                <td>${funcionario.nome}</td>
                <td>${funcionario.telefone}</td>
                <td>
                    <button class="botao-acao atualizar" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#fff">
                            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 
                            0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720
                            q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84
                            q-28 106-114 173t-196 67Z"/>
                        </svg>
                    </button>
                    <button class="botao-acao remover" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                             viewBox="0 -960 960 960" width="24px" fill="#fff">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240
                            v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400
                            v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520
                            -520Z"/>
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
        document.querySelectorAll('.atualizar').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirAtualizar(index);
            });
        });

        document.querySelectorAll('.remover').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirRemover(index);
            });
        });
    }

    // Configurar event listeners principais
    function configurarEventListeners() {
        // Pesquisa
        if (pesquisaInput) {
            pesquisaInput.addEventListener('input', () => {
                const filtro = pesquisaInput.value.toLowerCase();
                const listaFiltrada = funcionarios.filter(f =>
                    f.nome.toLowerCase().includes(filtro) || f.cpf.includes(filtro)
                );
                renderizarTabela(listaFiltrada);
            });
        }

        // Botão adicionar
        const botaoAdicionar = document.getElementById('abrirAdicionar');
        if (botaoAdicionar) {
            botaoAdicionar.addEventListener('click', () => {
                if (cpfInput) cpfInput.value = '';
                if (nomeInput) nomeInput.value = '';
                if (sobrenomeInput) sobrenomeInput.value = '';
                if (telefoneInput) telefoneInput.value = '';
                abrirModal(modalAdicionar);
            });
        }

        // Confirmar adição
        if (confirmarAdicionar) {
            confirmarAdicionar.addEventListener('click', () => {
                const cpf = cpfInput ? cpfInput.value.trim() : '';
                const nome = nomeInput ? nomeInput.value.trim() : '';
                const sobrenome = sobrenomeInput ? sobrenomeInput.value.trim() : '';
                const telefone = telefoneInput ? telefoneInput.value.trim() : '';

                // Validar campos obrigatórios
                const erroValidacao = validarCamposObrigatorios(cpf, nome, sobrenome);
                if (erroValidacao) {
                    mostrarAlgo(erroValidacao);
                    return;
                }

                // Verificar se CPF já existe
                if (cpfExiste(cpf)) {
                    mostrarAlgo('CPF já cadastrado no sistema');
                    return;
                }

                // Format CPF para consistência
                const cpfFormatado = formatarCPF(cpf);

                // Juntar nome e sobrenome
                const nomeCompleto = juntarNomeSobrenome(nome, sobrenome);
                
                funcionarios.push({
                    cpf: cpfFormatado,
                    nome: nomeCompleto,
                    sobrenome: sobrenome,
                    telefone: telefone
                });
                
                renderizarTabela(funcionarios);
                window.fecharModal('modalAdicionarFunc');
            });
        }

        // Confirmar atualização
        if (confirmarAtualizar) {
            confirmarAtualizar.addEventListener('click', () => {
                const nome = nomeUpdate ? nomeUpdate.value.trim() : '';
                const sobrenome = sobrenomeUpdate ? sobrenomeUpdate.value.trim() : '';
                const telefone = telefoneUpdate ? telefoneUpdate.value.trim() : '';

                // Validar campos obrigatórios
                const erroValidacao = validarCamposObrigatorios(
                    funcionarios[funcionarioSelecionadoIndex].cpf, 
                    nome, 
                    sobrenome
                );
                
                if (erroValidacao) {
                    mostrarAlgo(erroValidacao);
                    return;
                }

                // Juntar nome e sobrenome
                const nomeCompleto = juntarNomeSobrenome(nome, sobrenome);
                
                funcionarios[funcionarioSelecionadoIndex].nome = nomeCompleto;
                funcionarios[funcionarioSelecionadoIndex].sobrenome = sobrenome;
                funcionarios[funcionarioSelecionadoIndex].telefone = telefone;
                
                renderizarTabela(funcionarios);
                window.fecharModal('modalAtualizarFunc');
            });
        }

        // Confirmar remoção
        if (confirmarRemover) {
            confirmarRemover.addEventListener('click', () => {
                if (funcionarioSelecionadoIndex !== null) {
                    funcionarios.splice(funcionarioSelecionadoIndex, 1);
                    renderizarTabela(funcionarios);
                    window.fecharModal('modalRemoverFunc');
                    funcionarioSelecionadoIndex = null;
                }
            });
        }
    }

    // Inicializar
    renderizarTabela(funcionarios);
    configurarEventListeners();
}