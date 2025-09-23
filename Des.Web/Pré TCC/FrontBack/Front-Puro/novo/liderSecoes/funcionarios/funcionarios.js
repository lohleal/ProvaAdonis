export function iniciarFuncionarios() {
    let funcionarios = [
        { cpf: '123.456.789-00', nome: 'Marielle', telefone: '(11) 98765-4321' },
        { cpf: '987.654.321-00', nome: 'Analice', telefone: '(21) 91234-5678' }
    ];

    // Seleciona elementos do DOM
    const tabelaBody = document.querySelector('#tabelaFuncionarios tbody');
    const pesquisaInput = document.getElementById('pesquisa');
    const modalAdicionar = document.getElementById('modalAdicionar');
    const modalAtualizar = document.getElementById('modalAtualizar');
    const modalRemover = document.getElementById('modalRemover');

    // Campos do modal adicionar
    const cpfInput = document.getElementById('cpfInput');
    const nomeInput = document.getElementById('nomeInput');
    const telefoneInput = document.getElementById('telefoneInput');
    const confirmarAdicionar = document.getElementById('confirmarAdicionar');

    // Campos do modal atualizar
    const nomeUpdate = document.getElementById('nomeUpdate');
    const telefoneUpdate = document.getElementById('telefoneUpdate');
    const confirmarAtualizar = document.getElementById('confirmarAtualizar');

    // Campos do modal remover
    const textoRemover = document.getElementById('textoRemover');
    const confirmarRemover = document.getElementById('confirmarRemover');

    let funcionarioSelecionadoIndex = null;

    // Funções para abrir e fechar modais
    function abrirModal(modal) {
        modal.style.display = 'flex';
    }

    function fecharModal(idModal) {
        document.getElementById(idModal).style.display = 'none';
    }

    // Fechar modal central e filhos
    window.fecharModalTabela = function () {
        const modalTabela = document.getElementById('modalFuncionario');
        if (modalTabela) modalTabela.style.display = 'none';

        ['modalAdicionar', 'modalAtualizar', 'modalRemover'].forEach(id => {
            const modal = document.getElementById(id);
            if (modal) modal.style.display = 'none';
        });

        // Voltar o titulo e sumir com o back que fica 
        if (titulo) titulo.style.display = "block"; 
        if (subtitulo) subtitulo.style.display = "block"; 
        modalContainer.style.display = 'none';
    }

    // Funções para abrir os modais de atualizar e remover
    function abrirAtualizar(index) {
        funcionarioSelecionadoIndex = index;
        const f = funcionarios[index];
        nomeUpdate.value = f.nome;
        telefoneUpdate.value = f.telefone;
        abrirModal(modalAtualizar);
    }

    function abrirRemover(index) {
        funcionarioSelecionadoIndex = index;
        textoRemover.textContent = `Deseja remover o funcionário ${funcionarios[index].nome}?`;
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
                    <button class="botao-acao atualizar">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="#fff">
                            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 
                            0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720
                            q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84
                            q-28 106-114 173t-196 67Z"/>
                        </svg>
                    </button>
                    <button class="botao-acao remover">
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

            // Adiciona listeners para cada botão
            const botaoAtualizar = row.querySelector('.atualizar');
            const botaoRemover = row.querySelector('.remover');

            botaoAtualizar.addEventListener('click', () => abrirAtualizar(index));
            botaoRemover.addEventListener('click', () => abrirRemover(index));
        });
    }

    // Pesquisa em tempo real
    pesquisaInput.addEventListener('input', () => {
        const filtro = pesquisaInput.value.toLowerCase();
        const listaFiltrada = funcionarios.filter(f =>
            f.nome.toLowerCase().includes(filtro) || f.cpf.includes(filtro)
        );
        renderizarTabela(listaFiltrada);
    });

    // Botão adicionar
    const botaoAdicionar = document.getElementById('abrirAdicionar');
    botaoAdicionar.addEventListener('click', () => {
        cpfInput.value = '';
        nomeInput.value = '';
        telefoneInput.value = '';
        abrirModal(modalAdicionar);
    });

    confirmarAdicionar.addEventListener('click', () => {
        if (cpfInput.value && nomeInput.value && telefoneInput.value) {
            funcionarios.push({
                cpf: cpfInput.value,
                nome: nomeInput.value,
                telefone: telefoneInput.value
            });
            renderizarTabela(funcionarios);
            fecharModal('modalAdicionar');
        } else {
            alert('Preencha todos os campos.');
        }
    });

    // Botão atualizar
    confirmarAtualizar.addEventListener('click', () => {
        if (nomeUpdate.value && telefoneUpdate.value) {
            funcionarios[funcionarioSelecionadoIndex].nome = nomeUpdate.value;
            funcionarios[funcionarioSelecionadoIndex].telefone = telefoneUpdate.value;
            renderizarTabela(funcionarios);
            fecharModal('modalAtualizar');
        } else {
            alert('Preencha todos os campos.');
        }
    });

    // Botão remover
    confirmarRemover.addEventListener('click', () => {
        funcionarios.splice(funcionarioSelecionadoIndex, 1);
        renderizarTabela(funcionarios);
        fecharModal('modalRemover');
    });

    // Inicializa tabela
    renderizarTabela(funcionarios);
}