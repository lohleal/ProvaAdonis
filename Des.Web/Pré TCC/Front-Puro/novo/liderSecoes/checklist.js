export function iniciarChecklist() {
    let checklists = [
        { 
            placa: 'ABC-1234', 
            cpf: '123.456.789-00', 
            telefone: '(11) 98765-4321', 
            entrada: '2024-01-15T10:30', 
            tipoCliente: 'Padrão',
            selecionado: false
        },
        { 
            placa: 'XYZ-5678', 
            cpf: '987.654.321-00', 
            telefone: '(21) 91234-5678', 
            entrada: '2024-01-15T14:20', 
            tipoCliente: 'Premium',
            selecionado: false
        }
    ];

    // Seleciona elementos do DOM
    const tabelaBody = document.querySelector('#tabelaChecklist tbody');
    const pesquisaInput = document.getElementById('pesquisaChecklist');
    
    // Modais
    const modalEntrada = document.getElementById('modalEntrada');
    const modalSaida = document.getElementById('modalSaida');
    const modalAtualizar = document.getElementById('modalAtualizarChecklist');
    const modalInfo = document.getElementById('modalInfo');

    // Campos dos modais
    const placaEntrada = document.getElementById('placaEntrada'); 
    const cpfEntrada = document.getElementById('cpfEntrada');
    const cnpjEntrada = document.getElementById('cnpjEntrada');
    const telefoneEntrada = document.getElementById('telefoneEntrada');
    const dataHoraEntrada = document.getElementById('dataHoraEntrada');
    const tipoClienteEntrada = document.getElementById('tipoClienteEntrada');
    const motivoEntrada = document.getElementById('motivoEntrada');
    const confirmarEntrada = document.getElementById('confirmarEntrada');
    
    const dataHoraSaida = document.getElementById('dataHoraSaida');
    const opcaoPagamento = document.getElementById('opcaoPagamento');
    const valorSaida = document.getElementById('valorSaida');
    const motivoSaida = document.getElementById('motivoSaida');
    const confirmarSaida = document.getElementById('confirmarSaida');
    
    const cpfAtualizar = document.getElementById('cpfAtualizar');
    const cnpjAtualizar = document.getElementById('cnpjAtualizar');
    const placaAtualizar = document.getElementById('placaAtualizar');
    const telefoneAtualizar = document.getElementById('telefoneAtualizar');
    const dataHoraAtualizar = document.getElementById('dataHoraAtualizar');
    const tipoClienteAtualizar = document.getElementById('tipoClienteAtualizar');
    const motivoAtualizar = document.getElementById('motivoAtualizar');
    const confirmarAtualizar = document.getElementById('confirmarAtualizarChecklist');
    
    const infoPlaca = document.getElementById('infoPlaca');
    const infoCpf = document.getElementById('infoCpf');
    const infoTelefone = document.getElementById('infoTelefone');
    const infoEntrada = document.getElementById('infoEntrada');
    const infoTipoCliente = document.getElementById('infoTipoCliente');

    let checklistSelecionadoIndex = null;

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

    // Função para verificar se CPF já existe (exceto no índice atual para atualização)
    function cpfJaExiste(cpf, indiceAtual = -1) {
        return patio.some((veiculo, index) => 
            index !== indiceAtual && veiculo.cpf === cpf
        );
    }

    // Função para validar campos obrigatórios
    function validarCamposObrigatorios(placa, cpf, telefone, tipoCliente) {
        if (!placa || placa.trim() === '') {
            mostrarAlgo('A placa é obrigatória');
            return false;
        }
        
        if (!cpf || cpf.trim() === '') {
            mostrarAlgo('O CPF é obrigatório');
            return false;
        }
        
        if (!telefone || telefone.trim() === '') {
            mostrarAlgo('O telefone é obrigatório');
            return false;
        }
        
        if (!tipoCliente || tipoCliente.trim() === '') {
            mostrarAlgo('O tipo de cliente é obrigatório');
            return false;
        }
        
        return true;
    }

    // Função para abrir modal
    function abrirModal(modal) {
        console.log('Abrindo modal:', modal.id);
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Abrir modal de entrada 
    function abrirEntrada() {
        if (placaEntrada) placaEntrada.value = ''; 
        if (cpfEntrada) cpfEntrada.value = '';
        if (cnpjEntrada) cnpjEntrada.value = '';
        if (telefoneEntrada) telefoneEntrada.value = '';
        if (dataHoraEntrada) dataHoraEntrada.value = new Date().toISOString().slice(0, 16);
        if (tipoClienteEntrada) tipoClienteEntrada.value = '';
        if (motivoEntrada) motivoEntrada.value = '';
        
        abrirModal(modalEntrada);
    }

    // Abrir modal de saída
    function abrirSaida(index) {
        checklistSelecionadoIndex = index;
        const checklist = checklists[index];
        
        if (dataHoraSaida) dataHoraSaida.value = new Date().toISOString().slice(0, 16);
        if (opcaoPagamento) opcaoPagamento.value = '';
        if (valorSaida) valorSaida.value = '';
        if (motivoSaida) motivoSaida.value = '';
        
        abrirModal(modalSaida);
    }

    // Abrir modal de atualizar
    function abrirAtualizar(index) {
        checklistSelecionadoIndex = index;
        const checklist = checklists[index];
        
        if (cpfAtualizar) cpfAtualizar.value = checklist.cpf || '';
        if (cnpjAtualizar) cnpjAtualizar.value = '';
        if (placaAtualizar) placaAtualizar.value = checklist.placa || '';
        if (telefoneAtualizar) telefoneAtualizar.value = checklist.telefone || '';
        if (dataHoraAtualizar) dataHoraAtualizar.value = checklist.entrada || '';
        if (tipoClienteAtualizar) tipoClienteAtualizar.value = checklist.tipoCliente || '';
        if (motivoAtualizar) motivoAtualizar.value = '';
        
        abrirModal(modalAtualizar);
    }

    // Abrir modal de informações
    function abrirInfo(index) {
        const checklist = checklists[index];
        
        if (infoPlaca) infoPlaca.textContent = checklist.placa;
        if (infoCpf) infoCpf.textContent = checklist.cpf;
        if (infoTelefone) infoTelefone.textContent = checklist.telefone;
        if (infoEntrada) infoEntrada.textContent = formatarData(checklist.entrada);
        if (infoTipoCliente) infoTipoCliente.textContent = checklist.tipoCliente;
        
        abrirModal(modalInfo);
    }

    // Formatador de data
    function formatarData(dataString) {
        if (!dataString) return '';
        const data = new Date(dataString);
        return data.toLocaleString('pt-BR');
    }

    // Renderizar tabela
    function renderizarTabela(lista) {
        
        tabelaBody.innerHTML = '';
        lista.forEach((checklist, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <input type="checkbox" ${checklist.selecionado ? 'checked' : ''} 
                           onchange="toggleSelecionado(${index})" />
                </td>
                <td>${checklist.placa}</td>
                <td>${checklist.cpf}</td>
                <td>${checklist.telefone}</td>
                <td>
                    <button class="botao-acao atualizar-checklist" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#fff">
                            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                        </svg>
                    </button>
                    <button class="botao-acao saida-checklist" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                             viewBox="0 -960 960 960" width="24px" fill="#fff">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240
                            v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400
                            v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520
                            -520Z"/>
                        </svg>
                    </button>
                    <button class="botao-acao info-checklist" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#fff">
                            <path d="M480-680q-33 0-56.5-23.5T400-760q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760q0 33-23.5 56.5T480-680Zm-60 560v-480h120v480H420Z"/>
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
        // Botões de atualizar
        document.querySelectorAll('.atualizar-checklist').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirAtualizar(index);
            });
        });

        // Botões de info
        document.querySelectorAll('.info-checklist').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirInfo(index);
            });
        });

        // Botões de saída
        document.querySelectorAll('.saida-checklist').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirSaida(index);
            });
        });
    }

    // Função global para toggle selecionado
    window.toggleSelecionado = function(index) {
        checklists[index].selecionado = !checklists[index].selecionado;
        renderizarTabela(checklists);
    }

    // Configurar event listeners principais
    function configurarEventListeners() {
        // Pesquisa
        if (pesquisaInput) {
            pesquisaInput.addEventListener('input', () => {
                const filtro = pesquisaInput.value.toLowerCase();
                const listaFiltrada = checklists.filter(c =>
                    c.placa.toLowerCase().includes(filtro) || 
                    c.cpf.includes(filtro)
                );
                renderizarTabela(listaFiltrada);
            });
        }

        // Botão entrada
        const botaoEntrada = document.getElementById('abrirEntrada');
        if (botaoEntrada) {
            botaoEntrada.addEventListener('click', () => {
                abrirEntrada();
            });
        }

        // Confirmar entrada
        if (confirmarEntrada) {
            confirmarEntrada.addEventListener('click', () => {
                // Validar campos obrigatórios
                if (!validarCamposObrigatorios(
                    placaEntrada?.value, 
                    cpfEntrada?.value, 
                    telefoneEntrada?.value,
                    tipoClienteEntrada?.value
                )) {
                    return;
                }

                // Verificar se CPF já existe
                if (cpfJaExiste(cpfEntrada.value)) {
                    mostrarErro('CPF já cadastrado no pátio');
                    return;
                }

                // Verificar outros campos obrigatórios
                if (dataHoraEntrada && dataHoraEntrada.value) {
                    
                    checklists.push({
                        placa: placaEntrada.value,  
                        cpf: cpfEntrada.value,
                        telefone: telefoneEntrada.value,
                        entrada: dataHoraEntrada.value,
                        tipoCliente: tipoClienteEntrada.value,
                        selecionado: false
                    });
                    renderizarTabela(checklists);
                    window.fecharModal('modalEntrada');
                    mostrarAlgo('Entrada registrada com sucesso!');
                } else {
                    mostrarAlgo('Preencha todos os campos obrigatórios');
                }
            });
        }

        // Confirmar saída
        if (confirmarSaida) {
            confirmarSaida.addEventListener('click', () => {
                if (checklistSelecionadoIndex !== null) {
                    if (dataHoraSaida && dataHoraSaida.value && 
                        opcaoPagamento && opcaoPagamento.value && 
                        valorSaida && valorSaida.value) {
                        
                        checklists.splice(checklistSelecionadoIndex, 1);
                        renderizarTabela(checklists);
                        window.fecharModal('modalSaida');
                        checklistSelecionadoIndex = null;
                        mostrarAlgo('Saída registrada com sucesso!');
                    } else {
                        mostrarAlgo('Preencha todos os campos obrigatórios');
                    }
                } else {
                    mostrarAlgo('Nenhum veículo selecionado');
                }
            });
        }

        // Confirmar atualização
        if (confirmarAtualizar) {
            confirmarAtualizar.addEventListener('click', () => {
                if (checklistSelecionadoIndex !== null) {
                    // Validar campos obrigatórios
                    if (!validarCamposObrigatorios(
                        placaAtualizar?.value, 
                        cpfAtualizar?.value, 
                        telefoneAtualizar?.value,
                        tipoClienteAtualizar?.value
                    )) {
                        return;
                    }

                    // Verificar se CPF já existe (exceto no registro atual)
                    if (cpfJaExiste(cpfAtualizar.value, veiculoSelecionadoIndex)) {
                        mostrarErro('CPF já cadastrado em outro veículo');
                        return;
                    }

                    // Verificar outros campos obrigatórios
                    if (dataHoraAtualizar && dataHoraAtualizar.value) {
                        
                        checklists[checklistSelecionadoIndex].cpf = cpfAtualizar.value;
                        checklists[checklistSelecionadoIndex].placa = placaAtualizar.value;
                        checklists[checklistSelecionadoIndex].telefone = telefoneAtualizar.value;
                        checklists[checklistSelecionadoIndex].entrada = dataHoraAtualizar.value;
                        checklists[checklistSelecionadoIndex].tipoCliente = tipoClienteAtualizar.value;
                        
                        renderizarTabela(checklists);
                        window.fecharModal('modalAtualizarChecklist');
                        mostrarAlgo('Veículo atualizado com sucesso!');
                    } else {
                        mostrarAlgo('Preencha todos os campos obrigatórios');
                    }
                } else {
                    mostrarAlgo('Nenhum Veículo selecionado');
                }
            });
        }
    }

    // Inicializar
    renderizarTabela(checklists);
    configurarEventListeners();
}