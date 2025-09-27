// Elementos
const simboloUsuario = document.getElementById('simboloUsuario');
const menuUsuario = document.getElementById('menuUsuario');
const titulo = document.getElementById('titulo');
const subtitulo = document.getElementById('subtitulo');
const modalContainer = document.getElementById('modalContainer');

// Menu usuário
simboloUsuario.addEventListener('click', () => {
    menuUsuario.style.display = menuUsuario.style.display === 'block' ? 'none' : 'block';
});

// Logout
document.getElementById('botaoSair').addEventListener('click', function () {
    window.location.href = "../../inicio/inicio.html";
});

// News - abre em nova aba
document.getElementById('botaoNews').addEventListener('click', function () {
    window.open("../../novidades/news.html", "_blank");
});

// Abrir seções/modais
function abrirMenu(secao) {
    esconderTitulo();

    switch (secao) {
        case "Dados":
            carregarModalCompleto("dados");
            break;
        case "Senhas":
            carregarModalCompleto("senhas");
            break;
        case "Funcionarios":
            carregarModalCompleto("funcionarios");
            break;
        case "CriarLogin":
            carregarModalCompleto("criarLogin");
            break;
        case "Turnos":
            alert("Tela de Turnos ainda em desenvolvimento...");
            break;
        case "Relatorios":
            alert("Tela de Relatorios ainda em desenvolvimento...");
            break;
        case "Checklist":
            carregarModalCompleto("checklist");
            break;
    }
}

// Função para carregar modais simples (mantida para compatibilidade)
function carregarModal(caminhoHtml, caminhoJs) {
    fetch(caminhoHtml)
        .then(res => res.text())
        .then(html => {
            modalContainer.innerHTML = html;
            modalContainer.style.display = "flex";

            if (caminhoJs) {
                import(caminhoJs).then(module => {
                    if (module.iniciarFuncionarios) {
                        module.iniciarFuncionarios();
                    }
                    else if (module.iniciarChecklist) {
                        module.iniciarChecklist();
                    }
                });
            }
        })
        .catch(() => alert("Não foi possível abrir a tela."));
}

// Nova função para carregar TODOS os modais
function carregarModalCompleto(tipo) {
    let htmlCompleto = '';
    let moduloJs = '';

    switch (tipo) {
        case "funcionarios":
            htmlCompleto = `
                <div id="modalFuncionario">
                    <!-- Botão Fechar -->
                    <button class="botao-fechar" onclick="fecharModalTabela('funcionarios')" aria-label="Fechar modal de funcionários">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#f2c14e" viewBox="0 -960 960 960">
                            <path d="m256-200-56-56 224-224-224-224 56-56 
                                 224 224 224-224 56 56-224 224 224 224-56 
                                 56-224-224-224 224Z" />
                        </svg>
                    </button>

                    <!-- Barra de Pesquisa -->
                    <div class="container-pesquisa">
                        <input type="text" id="pesquisa" class="input-pesquisa" placeholder="Digite o nome ou cpf para buscar..." />

                        <div style="margin-left: 400px;">
                            <button class="botao-acao" id="abrirAdicionar">
                                Adicionar
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px">
                                    <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <hr />

                    <!-- Tabela -->
                    <div id="tabelaFuncionarios" class="tabela-estilizada">
                        <table>
                            <thead>
                                <tr>
                                    <th>CPF</th>
                                    <th>NOME</th>
                                    <th>TELEFONE</th>
                                    <th>AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>

                <!-- Modal Adicionar -->
                <div class="modal-secundario" id="modalAdicionarFunc" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalAdicionarFunc')" aria-label="Fechar modal de adicionar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                                 224 224 224-224 56 56-224 224 224 224-56 
                                 56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label class="label">Adicionar Funcionário</label>
                        <div class="formulario-modal">
                            <input class="input-modal" id="cpfInput" placeholder="Digite o CPF" />
                            <input class="input-modal" id="nomeInput" placeholder="Digite o Nome"" />
                            <input class="input-modal" id="sobrenomeInput" placeholder="Digite o Sobrenome" />
                            <input class="input-modal" id="telefoneInput" placeholder="Digite o Telefone" />
                            <button class="botao" id="confirmarAdicionar">Confirmar</button>
                        </div>
                    </div>
                </div>

                <!-- Modal Atualizar -->
                <div class="modal-secundario" id="modalAtualizarFunc" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalAtualizarFunc')" aria-label="Fechar modal de atualizar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                                 224 224 224-224 56 56-224 224 224 224-56 
                                 56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label class="label">Atualizar Dados</label>
                        <div class="formulario-modal">
                            <input class="input-modal" id="nomeUpdate" placeholder="Digite o Nome" style="flex: 1;" />
                            <input class="input-modal" id="sobrenomeUpdate" placeholder="Digite o Sobrenome" style="flex: 1;" />
                            <input class="input-modal" id="telefoneUpdate" placeholder="Telefone" />
                            <button class="botao" id="confirmarAtualizar">Confirmar</button>
                        </div>
                    </div>
                </div>

                <!-- Modal Remover -->
                <div class="modal-secundario" id="modalRemoverFunc" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalRemoverFunc')" aria-label="Fechar modal de remover">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                                 224 224 224-224 56 56-224 224 224 224-56 
                                 56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label id="textoRemover" class="label"></label>
                        <div class="formulario-modal">
                            <button class="botao" id="confirmarRemover">Sim</button>
                        </div>
                    </div>
                </div>
            `;
            moduloJs = "../../liderSecoes/funcionarios.js";
            break;

        case "checklist":
            htmlCompleto = `
                <div id="modalChecklist">
                    <!-- Botão Fechar -->
                    <button class="botao-fechar" onclick="fecharModalTabela('checklist')" aria-label="Fechar modal de checklist">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#f2c14e" viewBox="0 -960 960 960">
                            <path d="m256-200-56-56 224-224-224-224 56-56 
                             224 224 224-224 56 56-224 224 224 224-56 
                             56-224-224-224 224Z" />
                        </svg>
                    </button>

                    <!-- Barra de Pesquisa -->
                    <div class="container-pesquisa">
                        <input type="text" id="pesquisaChecklist" class="input-pesquisa" placeholder="Digite a placa..." />

                        <div style="margin-left: 400px;">
                            <button class="botao-acao" id="abrirEntrada">
                                Entrada
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <hr />

                    <!-- Tabela -->
                    <div id="tabelaChecklist" class="tabela-estilizada">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>PLACA</th>
                                    <th>CPF</th>
                                    <th>TELEFONE</th>
                                    <th>AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Dados serão inseridos via JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Modal Entrada -->
                <div class="modal-secundario-checklist" id="modalEntrada" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalEntrada')" aria-label="Fechar modal de entrada">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                             224 224 224-224 56 56-224 224 224 224-56 
                             56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label class="label">Entrada</label>
                        <div class="formulario-modal">
                            <input class="input-modal" id="placaEntrada" placeholder="Digite a Placa" />
                            <input class="input-modal" id="cpfEntrada" placeholder="Digite o CPF" />
                            <input class="input-modal" id="cnpjEntrada" placeholder="Digite o CNPJ" />
                            <input class="input-modal" id="telefoneEntrada" placeholder="Digite o Telefone" />
                            <input class="input-modal" id="dataHoraEntrada" type="datetime-local" />
                            
                            <select class="select" id="tipoClienteEntrada">
                                <option value="">Tipo de cliente</option>
                                <option>Padrão</option>
                                <option>Cadastrado</option>
                                <option>Premium</option>
                                <option>Power</option>
                                <option>Fidelidade</option>
                                <option>Aditivado</option>
                            </select>

                            <label class="label-textarea">Motivo: 
                                <textarea id="motivoEntrada" rows="3"></textarea>
                            </label>

                            <button class="botao" id="confirmarEntrada">Confirmar</button>
                        </div>
                    </div>
                </div>

                <!-- Modal Saída -->
                <div class="modal-secundario-checklist" id="modalSaida" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalSaida')" aria-label="Fechar modal de saída">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                             224 224 224-224 56 56-224 224 224 224-56 
                             56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label class="label">Saída</label>
                        <div class="formulario-modal">
                            <input class="input-modal" id="dataHoraSaida" type="datetime-local" />
                            
                            <select class="select" id="opcaoPagamento">
                                <option value="">Opção de Pagamento</option>
                                <option value="debito">Cartão Débito</option>
                                <option value="credito">Cartão Crédito</option>
                                <option value="aldo">PIX ALDO</option>
                                <option value="tef">PIX TEF</option>
                                <option value="dinheiro">Dinheiro</option>
                            </select>
                            
                            <input class="input-modal" id="valorSaida" type="text" readonly placeholder="Valor" />

                            <label class="label-textarea">Motivo: 
                                <textarea id="motivoSaida" rows="3"></textarea>
                            </label>

                            <button class="botao" id="confirmarSaida">Confirmar</button>
                        </div>
                    </div>
                </div>

                <!-- Modal Atualizar -->
                <div class="modal-secundario-checklist" id="modalAtualizarChecklist" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalAtualizarChecklist')" aria-label="Fechar modal de atualizar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                             224 224 224-224 56 56-224 224 224 224-56 
                             56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label class="label">Atualizar Dados</label>
                        <div class="formulario-modal">
                            <input class="input-modal" id="cpfAtualizar" placeholder="CPF" />
                            <input class="input-modal" id="cnpjAtualizar" placeholder="CNPJ" />
                            <input class="input-modal" id="placaAtualizar" placeholder="Placa" />
                            <input class="input-modal" id="telefoneAtualizar" placeholder="Telefone" />
                            <input class="input-modal" id="dataHoraAtualizar" type="datetime-local" />
                            
                            <select class="select" id="tipoClienteAtualizar">
                                <option value="">Tipo de cliente</option>
                                <option>Padrão</option>
                                <option>Cadastrado</option>
                                <option>Premium</option>
                                <option>Power</option>
                                <option>Fidelidade</option>
                                <option>Aditivado</option>
                            </select>

                            <label class="label-textarea">Motivo: 
                                <textarea id="motivoAtualizar" rows="3"></textarea>
                            </label>

                            <button class="botao" id="confirmarAtualizarChecklist">Confirmar</button>
                        </div>
                    </div>
                </div>

                <!-- Modal Informações -->
                <div class="modal-secundario-checklist" id="modalInfo" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalInfo')" aria-label="Fechar modal de informações">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                             224 224 224-224 56 56-224 224 224 224-56 
                             56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label class="label">Informações Completas</label>
                        <div class="formulario-modal">
                            <p><strong>Placa:</strong> <span id="infoPlaca"></span></p>
                            <p><strong>CPF:</strong> <span id="infoCpf"></span></p>
                            <p><strong>Telefone:</strong> <span id="infoTelefone"></span></p>
                            <p><strong>Entrada:</strong> <span id="infoEntrada"></span></p>
                            <p><strong>Tipo de Cliente:</strong> <span id="infoTipoCliente"></span></p>
                            <button class="botao" onclick="fecharModal('modalInfo')">Fechar</button>
                        </div>
                    </div>
                </div>
            `;
            moduloJs = "../../liderSecoes/checklist.js";
            break;

        case "criarLogin":
            htmlCompleto = `
                <div id="modalCriarLogin">
                    <!-- Botão Fechar -->
                    <button class="botao-fechar" onclick="fecharModalTabela('criarLogin')" aria-label="Fechar modal de criar login">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#f2c14e" viewBox="0 -960 960 960">
                            <path d="m256-200-56-56 224-224-224-224 56-56 
                                 224 224 224-224 56 56-224 224 224 224-56 
                                 56-224-224-224 224Z" />
                        </svg>
                    </button>

                    <!-- Barra de Pesquisa -->
                    <div class="container-pesquisa">
                        <input type="text" id="pesquisaLogin" class="input-pesquisa" placeholder="Digite o CPF para buscar..." />

                        <div style="margin-left: 400px;">
                            <button class="botao-acao" id="abrirCriarLogin">
                                Criar Login
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <hr />

                    <!-- Tabela -->
                    <div id="tabelaLogin" class="tabela-estilizada">
                        <table>
                            <thead>
                                <tr>
                                    <th>CPF</th>
                                    <th>DATA CRIAÇÃO</th>
                                    <th>AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>

                <!-- Modal Criar Login -->
                <div class="modal-secundario" id="modalCriarLoginForm" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalCriarLoginForm')" aria-label="Fechar modal de criar login">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                                 224 224 224-224 56 56-224 224 224 224-56 
                                 56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label class="label">Criar Novo Login</label>
                        <div class="formulario-modal">
                            <input class="input-modal" id="cpfLogin" placeholder="Digite o CPF" />
                            <input class="input-modal" id="senhaLogin" type="password" placeholder="Digite a senha" />
                            <input class="input-modal" id="confirmarSenha" type="password" placeholder="Confirme a senha" />
                            <button class="botao" id="confirmarCriarLogin">Criar Login</button>
                        </div>
                    </div>
                </div>

                <!-- Modal Redefinir Senha -->
                <div class="modal-secundario" id="modalRedefinirSenha" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalRedefinirSenha')" aria-label="Fechar modal de redefinir senha">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                                 224 224 224-224 56 56-224 224 224 224-56 
                                 56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label class="label">Redefinir Senha</label>
                        <div class="formulario-modal">
                            <input class="input-modal" id="cpfRedefinir" placeholder="CPF" readonly />
                            <input class="input-modal" id="novaSenha" type="password" placeholder="Nova senha" />
                            <input class="input-modal" id="confirmarNovaSenha" type="password" placeholder="Confirme a nova senha" />
                            <button class="botao" id="confirmarRedefinir">Redefinir Senha</button>
                        </div>
                    </div>
                </div>

                <!-- Modal Remover Login -->
                <div class="modal-secundario" id="modalRemoverLogin" style="display:none;">
                    <div>
                        <button class="botao-fechar" onclick="fecharModal('modalRemoverLogin')" aria-label="Fechar modal de remover login">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="m256-200-56-56 224-224-224-224 56-56 
                                 224 224 224-224 56 56-224 224 224 224-56 
                                 56-224-224-224 224Z" />
                            </svg>
                        </button>
                        <label id="textoRemoverLogin" class="label"></label>
                        <div class="formulario-modal">
                            <button class="botao" id="confirmarRemoverLogin">Sim, Remover</button>
                        </div>
                    </div>
                </div>
            `;
            moduloJs = "../../liderSecoes/criarLogin.js";
            break;

        case "dados":
            htmlCompleto = `
                
            `;
            moduloJs = "../../liderSecoes/dados.js"; 
            break;

        case "senhas":
            htmlCompleto = `<div>Seção de Senhas em desenvolvimento...</div>`;
            break;

        default:
            htmlCompleto = `<div>Modal não encontrado para: ${tipo}</div>`;
            break;
    }

    // Aplica o HTML ao container
    modalContainer.innerHTML = htmlCompleto;
    modalContainer.style.display = "flex";

    // Carrega o módulo JavaScript correspondente se existir
    if (moduloJs) {
        import(moduloJs)
            .then(module => {
                // Verifica qual função de inicialização chamar baseado no tipo
                switch (tipo) {
                    case "funcionarios":
                        if (module.iniciarFuncionarios) module.iniciarFuncionarios();
                        break;
                    case "checklist":
                        if (module.iniciarChecklist) module.iniciarChecklist();
                        break;
                    case "criarLogin":
                        if (module.iniciarCriarLogin) module.iniciarCriarLogin();
                        break;
                    case "dados":
                        if (module.iniciarDadosLider) module.iniciarDadosLider();
                        break;
                }
            })
            .catch(error => {
                console.error(`Erro ao carregar módulo ${tipo}:`, error);
            });
    }
}

// FUNÇÃO ÚNICA PARA FECHAR MODAIS SECUNDÁRIOS
window.fecharModal = function (idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'none';
    }
}

// FUNÇÃO ÚNICA PARA FECHAR TABELAS PRINCIPAIS
window.fecharModalTabela = function (tipo) {
    const modalContainer = document.getElementById('modalContainer');

    if (modalContainer) modalContainer.style.display = 'none';

    // Fechar modais secundários baseados no tipo
    const modaisSecundarios = {
        'funcionarios': ['modalAdicionarFunc', 'modalAtualizarFunc', 'modalRemoverFunc'],
        'checklist': ['modalEntrada', 'modalSaida', 'modalAtualizarChecklist', 'modalInfo'],
        'criarLogin': ['modalCriarLoginForm', 'modalRedefinirSenha', 'modalRemoverLogin'],
        'dados': ['modalEditarLider']
    };

    if (modaisSecundarios[tipo]) {
        modaisSecundarios[tipo].forEach(id => {
            window.fecharModal(id);
        });
    }

    // Restaurar título e subtítulo
    const titulo = document.getElementById('titulo');
    const subtitulo = document.getElementById('subtitulo');

    if (titulo) titulo.style.display = "block";
    if (subtitulo) subtitulo.style.display = "block";
}

// Mostrar/Esconder título principal
function esconderTitulo() {
    if (titulo) titulo.style.display = "none";
    if (subtitulo) subtitulo.style.display = "none";
}