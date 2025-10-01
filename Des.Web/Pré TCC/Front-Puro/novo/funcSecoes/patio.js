export function iniciarPatio() {
    let patio = [
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
    const tabelaBody = document.querySelector('#tabelaPatio tbody');
    const pesquisaInput = document.getElementById('pesquisaPatio');
    
    // Modais
    const modalEntrada = document.getElementById('modalEntrada');
    const modalSaida = document.getElementById('modalSaida');
    const modalAtualizar = document.getElementById('modalAtualizarPatio');
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
    const confirmarAtualizar = document.getElementById('confirmarAtualizarPatio');
    
    const infoPlaca = document.getElementById('infoPlaca');
    const infoCpf = document.getElementById('infoCpf');
    const infoTelefone = document.getElementById('infoTelefone');
    const infoEntrada = document.getElementById('infoEntrada');
    const infoTipoCliente = document.getElementById('infoTipoCliente');

    let veiculoSelecionadoIndex = null;

    // Função para mostrar modal de erro
    function mostrarErro(mensagem) {
        let modalErro = document.getElementById('modalErro');
        
        if (!modalErro) {
            modalErro = document.createElement('div');
            modalErro.id = 'modalErro';
            modalErro.className = 'modal-erro';
            document.body.appendChild(modalErro);
        }
        
        modalErro.textContent = mensagem;
        modalErro.classList.add('show');

        setTimeout(() => {
            modalErro.classList.remove('show');
        }, 3000);
    }

    // Função para verificar se CPF já existe 
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
        veiculoSelecionadoIndex = index;
        const veiculo = patio[index];
        
        if (dataHoraSaida) dataHoraSaida.value = new Date().toISOString().slice(0, 16);
        if (opcaoPagamento) opcaoPagamento.value = '';
        if (valorSaida) valorSaida.value = '';
        if (motivoSaida) motivoSaida.value = '';
        
        abrirModal(modalSaida);
    }

    // Abrir modal de atualizar
    function abrirAtualizar(index) {
        veiculoSelecionadoIndex = index;
        const veiculo = patio[index];
        
        if (cpfAtualizar) cpfAtualizar.value = veiculo.cpf || '';
        if (cnpjAtualizar) cnpjAtualizar.value = '';
        if (placaAtualizar) placaAtualizar.value = veiculo.placa || '';
        if (telefoneAtualizar) telefoneAtualizar.value = veiculo.telefone || '';
        if (dataHoraAtualizar) dataHoraAtualizar.value = veiculo.entrada || '';
        if (tipoClienteAtualizar) tipoClienteAtualizar.value = veiculo.tipoCliente || '';
        if (motivoAtualizar) motivoAtualizar.value = '';
        
        abrirModal(modalAtualizar);
    }

    // Abrir modal de informações
    function abrirInfo(index) {
        const veiculo = patio[index];
        
        if (infoPlaca) infoPlaca.textContent = veiculo.placa;
        if (infoCpf) infoCpf.textContent = veiculo.cpf;
        if (infoTelefone) infoTelefone.textContent = veiculo.telefone;
        if (infoEntrada) infoEntrada.textContent = formatarData(veiculo.entrada);
        if (infoTipoCliente) infoTipoCliente.textContent = veiculo.tipoCliente;
        
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
        if (!tabelaBody) {
            console.error('Tabela body não encontrada');
            return;
        }
        
        tabelaBody.innerHTML = '';
        lista.forEach((veiculo, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <input type="checkbox" ${veiculo.selecionado ? 'checked' : ''} 
                           onchange="toggleSelecionado(${index})" />
                </td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.cpf}</td>
                <td>${veiculo.telefone}</td>
                <td>${formatarData(veiculo.entrada)}</td>
                <td>${veiculo.tipoCliente}</td>
                <td>
                    <button class="botao-acao atualizar-patio" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#fff">
                            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                        </svg>
                    </button>
                    <button class="botao-acao saida-patio" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                            <path d="M200-440v-80h560v80H200Z"/>
                        </svg>
                    </button>
                    <button class="botao-acao info-patio" data-index="${index}">
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
        document.querySelectorAll('.atualizar-patio').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirAtualizar(index);
            });
        });

        // Botões de info
        document.querySelectorAll('.info-patio').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirInfo(index);
            });
        });

        // Botões de saída
        document.querySelectorAll('.saida-patio').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                abrirSaida(index);
            });
        });
    }

    // Função global para toggle selecionado
    window.toggleSelecionado = function(index) {
        patio[index].selecionado = !patio[index].selecionado;
        renderizarTabela(patio);
    }

    // Configurar event listeners principais
    function configurarEventListeners() {
        // Pesquisa
        if (pesquisaInput) {
            pesquisaInput.addEventListener('input', () => {
                const filtro = pesquisaInput.value.toLowerCase();
                const listaFiltrada = patio.filter(v =>
                    v.placa.toLowerCase().includes(filtro) || 
                    v.cpf.includes(filtro)
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
                    
                    patio.push({
                        placa: placaEntrada.value,  
                        cpf: cpfEntrada.value,
                        telefone: telefoneEntrada.value,
                        entrada: dataHoraEntrada.value,
                        tipoCliente: tipoClienteEntrada.value,
                        selecionado: false
                    });
                    renderizarTabela(patio);
                    window.fecharModal('modalEntrada');
                    mostrarErro('Entrada registrada com sucesso!');
                } else {
                    mostrarErro('Preencha todos os campos obrigatórios');
                }
            });
        }

        // Confirmar saída
        if (confirmarSaida) {
            confirmarSaida.addEventListener('click', () => {
                if (veiculoSelecionadoIndex !== null) {
                    if (dataHoraSaida && dataHoraSaida.value && 
                        opcaoPagamento && opcaoPagamento.value && 
                        valorSaida && valorSaida.value) {
                        
                        patio.splice(veiculoSelecionadoIndex, 1);
                        renderizarTabela(patio);
                        window.fecharModal('modalSaida');
                        veiculoSelecionadoIndex = null;
                        mostrarErro('Saída registrada com sucesso!');
                    } else {
                        mostrarErro('Preencha todos os campos obrigatórios');
                    }
                } else {
                    mostrarErro('Nenhum veículo selecionado');
                }
            });
        }

        // Confirmar atualização
        if (confirmarAtualizar) {
            confirmarAtualizar.addEventListener('click', () => {
                if (veiculoSelecionadoIndex !== null) {
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
                        
                        patio[veiculoSelecionadoIndex].cpf = cpfAtualizar.value;
                        patio[veiculoSelecionadoIndex].placa = placaAtualizar.value;
                        patio[veiculoSelecionadoIndex].telefone = telefoneAtualizar.value;
                        patio[veiculoSelecionadoIndex].entrada = dataHoraAtualizar.value;
                        patio[veiculoSelecionadoIndex].tipoCliente = tipoClienteAtualizar.value;
                        
                        renderizarTabela(patio);
                        window.fecharModal('modalAtualizarPatio');
                        mostrarErro('Veículo atualizado com sucesso!');
                    } else {
                        mostrarErro('Preencha todos os campos obrigatórios');
                    }
                } else {
                    mostrarErro('Nenhum veículo selecionado');
                }
            });
        }
    }

    // Inicializar
    renderizarTabela(patio);
    configurarEventListeners();
}