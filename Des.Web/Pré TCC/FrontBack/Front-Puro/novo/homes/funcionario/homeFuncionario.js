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
            carregarModal("../../liderSecoes/infos/dados.html", "../../liderSecoes/infos/dados.js");
            break;
        case "Senhas":
            carregarModal("../../liderSecoes/infos/senhas.html");
            break;
        case "Patio":
            carregarModalCompleto("patio");
            break;
        case "Relatorios":
            alert("Tela de Relatorios ainda em desenvolvimento...");
            break;
    }
}

// Função para carregar modais simples
function carregarModal(caminhoHtml, caminhoJs) {
    fetch(caminhoHtml)
        .then(res => res.text())
        .then(html => {
            modalContainer.innerHTML = html;
            modalContainer.style.display = "flex";

            if (caminhoJs) {
                import(caminhoJs).then(module => {
                    if (module.iniciarPatio) {
                        module.iniciarPatio();
                    }
                });
            }
        })
        .catch(() => alert("Não foi possível abrir a tela."));
}

// Nova função para carregar TODOS os modais
function carregarModalCompleto(tipo) {
    if (tipo === "patio") {
        const htmlCompleto = `
            <div id="modalPatio"> 
                <!-- Botão Fechar -->
                <button class="botao-fechar" onclick="fecharModalTabela('patio')" aria-label="Fechar modal de pátio"> <!-- MUDANÇA: checklist → patio -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#f2c14e" viewBox="0 -960 960 960">
                        <path d="m256-200-56-56 224-224-224-224 56-56 
                         224 224 224-224 56 56-224 224 224 224-56 
                         56-224-224-224 224Z" />
                    </svg>
                </button>

                <!-- Barra de Pesquisa -->
                <div class="container-pesquisa">
                    <input type="text" id="pesquisaPatio" class="input-pesquisa" placeholder="Digite a placa..." /> <!-- MUDANÇA: pesquisaChecklist → pesquisaPatio -->

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
                <div id="tabelaPatio" class="tabela-estilizada"> <!-- MUDANÇA: tabelaChecklist → tabelaPatio -->
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
                        <tbody></tbody>
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
            <div class="modal-secundario-checklist" id="modalAtualizarPatio" style="display:none;"> <!-- MUDANÇA: modalAtualizarChecklist → modalAtualizarPatio -->
                <div>
                    <button class="botao-fechar" onclick="fecharModal('modalAtualizarPatio')" aria-label="Fechar modal de atualizar"> <!-- MUDANÇA -->
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

                        <button class="botao" id="confirmarAtualizarPatio">Confirmar</button> <!-- MUDANÇA: confirmarAtualizarChecklist → confirmarAtualizarPatio -->
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

        modalContainer.innerHTML = htmlCompleto;
        modalContainer.style.display = "flex";

        import("../../funcSecoes//patio.js") 
            .then(module => {
                if (module.iniciarPatio) {
                    module.iniciarPatio();
                }
            })
            .catch(error => {
                console.error("Erro ao carregar módulo:", error);
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
        'patio': ['modalEntrada', 'modalSaida', 'modalAtualizarPatio', 'modalInfo'] 
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