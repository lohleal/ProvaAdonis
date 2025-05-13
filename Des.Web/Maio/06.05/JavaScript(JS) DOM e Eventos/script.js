//VARIÁVEIS GLOBAIS

//Controle do jogo
let tempo = 0;
let isPaused = false;
let id;
let naveDeveMover = false;
let podeAtirar = true;

//Elementos 
const valor = document.querySelector('#valor');
const telaPausa = document.getElementById('tela-pausa');
const naveBloco = document.getElementById('nave-bloco');
const missilEsquerdo = document.getElementById('missil-esquerdo');
const missilDireito = document.getElementById('missil-direito');

//SISTEMA DE TEMPO
function formatTime(seconds) {
    const horas = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutos = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const segundos = String(seconds % 60).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

function atualizarTempo() {
    if (!isPaused) {
        tempo++;
        valor.textContent = formatTime(tempo);
    }
}

function startCounter() {
    if (!id) {
        id = setInterval(atualizarTempo, 1000);
    }
}

function stopCounter() {
    clearInterval(id);
    id = null;
}

//CONTROLES DO JOGO

//Controle de pausa
document.addEventListener("keypress", function(event) {
    if (event.key.toLowerCase() === 'p') {
        isPaused = !isPaused;
        
        if (isPaused) {
            //Pausa 
            telaPausa.style.display = 'flex';

            naveBloco.classList.remove('animacao-ativa');
        } else {
            //Despausa
            telaPausa.style.display = 'none';
    
            //Só volta a mover se estava em movimento antes de pausar
            if (naveDeveMover) {
                naveBloco.classList.add('animacao-ativa');
            }
        }
    }
});

//Controle de disparo e movimento 
document.addEventListener("keydown", function(e) {
    if (e.code === 'Space' && podeAtirar && !isPaused) {
        e.preventDefault();
        
        // Ativa movimento se não estiver movendo
        if (!naveDeveMover) {
            naveDeveMover = true;
            naveBloco.classList.add('animacao-ativa');
        }
        
        // Dispara mísseis
        iniciarSequenciaDisparo();
    }
});

//SISTEMA DE DISPARO
function iniciarSequenciaDisparo() {
    podeAtirar = false;

    dispararMissil(missilEsquerdo, () => {
        dispararMissil(missilDireito, () => {
            resetarMisseis();
            podeAtirar = true;
        });
    });
}

function dispararMissil(missil, callback) {
    missil.style.transition = 'transform 0.5s linear';
    missil.style.transform = 'translateY(-100vh)';
    missil.addEventListener('transitionend', callback, {once: true});
}

function resetarMisseis() {

    //Reseta mísseis sem animação
    missilEsquerdo.style.transition = 'none';
    missilDireito.style.transition = 'none';
    missilEsquerdo.style.transform = 'translateY(0)';
    missilDireito.style.transform = 'translateY(0)';

    //Restaura animação 
    setTimeout(() => {
        missilEsquerdo.style.transition = 'transform 0.5s linear';
        missilDireito.style.transition = 'transform 0.5s linear';
    }, 10);
}

document.addEventListener("DOMContentLoaded", function() {
    startCounter();
});
