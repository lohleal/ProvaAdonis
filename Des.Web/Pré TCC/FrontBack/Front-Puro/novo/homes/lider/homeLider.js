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
        case "Funcionarios":
            carregarModal("../../liderSecoes/funcionarios/funcionarios.html", "../../liderSecoes/funcionarios/funcionarios.js");
            break;
        case "CriarLogin":
            carregarModal("../../liderSecoes/criarlogin/criarLogin.html", "../../liderSecoes/criarlogin/criarLogin.js");
            break;
        case "Turnos":
            alert("Tela de Turnos ainda em desenvolvimento...");
            break;
        case "Relatorios":
            alert("Tela de Relatorios ainda em desenvolvimento...");
            break;
        case "CheckList":
            carregarModal("../../liderSecoes/checklist/checklist.html", "../../liderSecoes/checklist/checklist.js");
            break;
    }
}

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
                });
            }
        })
        .catch(() => alert("Não foi possível abrir a tela."));
}

// Mostrar/Esconder título principal
function esconderTitulo() {
    if (titulo) titulo.style.display = "none";
    if (subtitulo) subtitulo.style.display = "none";
}