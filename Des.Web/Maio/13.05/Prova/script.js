// VARIÁVEIS GLOBAIS

// Controle do jogo
let tempo = 0;
let isPaused = false;
let intervalId;

let naveDeveMover = false;
let podeAtirarEsquerdo = true;
let podeAtirarDireito = true;

let vidas = 3;
let aliensAbatidos = 0;
let gameOver = false;
let perderVidaTimeout;
let perdeuVida = false;

let faseAtual = 1;
let aliensNaFase = 0;
let aliensDestruidosNaFase = 0;

// Posição e movimento
let posicaoNave = 45;
const velocidadeNave = 2;

// ELEMENTOS DO DOM
const valorTempo = document.querySelector('#valor');
const telaPausa = document.getElementById('tela-pausa');

const naveBloco = document.getElementById('nave-bloco');
const missilEsquerdo = document.getElementById('missil-esquerdo');
const missilDireito = document.getElementById('missil-direito');

const vidaDisplay = document.getElementById('vida');
const alienCountDisplay = document.getElementById('alien-count');

const backgrounds = [
    'url(./images/background.png)',
    'url(./images/background2.jpg)',
    'url(./images/background3.jpg)',
    'url(./images/background4.jpg)'
];

// SISTEMA DE TEMPO
function formatarTempo(segundos) {
    const horas = String(Math.floor(segundos / 3600)).padStart(2, '0');
    const minutos = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
    const segundosFormatados = String(segundos % 60).padStart(2, '0');
    return `${horas}:${minutos}:${segundosFormatados}`;
}

function atualizarTempo() {
    if (!isPaused) {
        tempo++;
        valorTempo.textContent = formatarTempo(tempo);
    }
}

function iniciarCronometro() {
    if (!intervalId) {
        intervalId = setInterval(atualizarTempo, 1000);
    }
}

function pararCronometro() {
    clearInterval(intervalId);
    intervalId = null;
}

// PAUSA
function alternarPausa() {
    isPaused = !isPaused;

    if (isPaused) {
        telaPausa.style.display = 'flex';
        pausarAliens(true);
        pararCronometro();
    } else {
        telaPausa.style.display = 'none';
        pausarAliens(false);
        iniciarCronometro();
    }
}

// MOVIMENTO DA NAVE
function moverNave(direcao) {
    posicaoNave += direcao;
    posicaoNave = Math.max(0, Math.min(90, posicaoNave));
    naveBloco.style.left = posicaoNave + '%';
}

/// SISTEMA DE DISPARO 
function iniciarSequenciaDisparo() {

    // Se ambos estão disponíveis, dispara esquerdo primeiro e depois direito
    if (podeAtirarEsquerdo && podeAtirarDireito) {
        podeAtirarEsquerdo = false;
        podeAtirarDireito = false;
        
        dispararMissil(missilEsquerdo, () => {
            
            dispararMissil(missilDireito, () => {
                podeAtirarDireito = true;
            });

            podeAtirarEsquerdo = true;
        });
    } 
    
    else if (podeAtirarEsquerdo) {
        podeAtirarEsquerdo = false;
        dispararMissil(missilEsquerdo, () => {
            podeAtirarEsquerdo = true;
        });
    } 
   
    else if (podeAtirarDireito) {
        podeAtirarDireito = false;
        dispararMissil(missilDireito, () => {
            podeAtirarDireito = true;
        });
    }
}

function dispararMissil(missil, callback) {
    if (missil.style.transform === 'translateY(-100vh)') return;
    
    missil.style.transition = 'transform 0.5s linear';
    missil.style.transform = 'translateY(-100vh)';
    missil.addEventListener('transitionend', callback, { once: true });
}

function resetarMissil(missil, callback) {
    missil.style.transition = 'none';
    missil.style.transform = 'translateY(0)';
    void missil.offsetWidth;
    missil.style.transition = 'transform 0.5s linear';
    if (callback) callback();
}

function dispararMissil(missil, callback) {
    if (missil.style.transform === 'translateY(-100vh)') return;
    
    missil.style.transition = 'transform 0.5s linear';
    missil.style.transform = 'translateY(-100vh)';
    missil.addEventListener('transitionend', callback, { once: true });

}

function resetarMissil(missil, callback) {
    missil.style.transition = 'none';
    missil.style.transform = 'translateY(0)';
    void missil.offsetWidth;
    missil.style.transition = 'transform 0.5s linear';
    if (callback) callback();
}

// SISTEMA DE ALIENS
function iniciarAliens() {
    const duracao = Math.max(2, 10 - ((faseAtual - 1) * 2));
    const aliens = document.querySelectorAll('.alien');

    aliens.forEach(alien => {
        if (!alien) return;
        alien.style.animation = `descerAlien ${duracao}s linear infinite`;
    });
}

function pausarAliens(pausar) {
    const estado = pausar ? 'paused' : 'running';
    const aliens = document.querySelectorAll('.alien');
    
    aliens.forEach(alien => {
        alien.style.animationPlayState = estado;
    });
}

function resetarPosicaoAliens() {
    pausarAliens(true);
    const aliens = document.querySelectorAll('.alien');

    aliens.forEach(alien => {
        alien.style.animation = 'none';
        void alien.offsetWidth;
    });

    iniciarAliens();
}

// VERIFICAÇÃO DE COLISÃO
function verificarColisao() {
    if (isPaused || perdeuVida || gameOver) return;

    const naveRect = naveBloco.getBoundingClientRect();
    const aliens = document.querySelectorAll('.alien');

    for (let alien of aliens) {
        const alienRect = alien.getBoundingClientRect();

        if (
            alienRect.bottom >= naveRect.top &&
            alienRect.top <= naveRect.bottom &&
            alienRect.right >= naveRect.left &&
            alienRect.left <= naveRect.right
        ) {
            perderVida();
            break;
        }
    }
}

function verificarColisaoMissilAlien() {
    const misseis = [missilEsquerdo, missilDireito];
    const aliens = document.querySelectorAll('.alien');

    misseis.forEach(missil => {
        if (missil.style.transform !== 'translateY(-100vh)') return;

        const missilRect = missil.getBoundingClientRect();

        aliens.forEach(alien => {
            if (!alien || alien.style.display === 'none') return;

            const alienRect = alien.getBoundingClientRect();

            if (
                missilRect.bottom >= alienRect.top &&
                missilRect.top <= alienRect.bottom &&
                missilRect.right >= alienRect.left &&
                missilRect.left <= alienRect.right
            ) {
                alien.remove();

                aliensAbatidos++;
                aliensDestruidosNaFase++;
                alienCountDisplay.textContent = `ALIEN: ${aliensAbatidos}`;

                if (missil === missilEsquerdo) {
                    resetarMissil(missilEsquerdo, () => {
                        podeAtirarEsquerdo = true;
                    });
                } else {
                    resetarMissil(missilDireito, () => {
                        podeAtirarDireito = true;
                    });
                }

                verificarFase();
            }
        });
    });
}

function verificarFase() {
    if (aliensDestruidosNaFase >= 3) {
        if (faseAtual === 4) {
            telaPausa.textContent = 'YOU WIN';
            telaPausa.style.display = 'flex';
            gameOver = true;
            pararCronometro();
            pausarAliens(true);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keypress", handleKeyPress);
            return;
        }

        faseAtual++;
        aliensDestruidosNaFase = 0;

        const areaJogo = document.getElementById('area-jogo');
        areaJogo.style.backgroundImage = backgrounds[faseAtual - 1];

        const container = document.getElementById('aliens-container');
        container.innerHTML = '';

        recriarAliens();
        iniciarAliens();
    }
}

function recriarAliens() {
    const container = document.getElementById('aliens-container');
    container.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
        const alien = document.createElement('img');
        alien.id = `alien${i}`;
        alien.className = 'alien';
        alien.src = './images/alien.png';
        alien.alt = 'Nave do alien';

        if (i === 1) alien.style.left = '30%';
        if (i === 2) alien.style.left = '50%';
        if (i === 3) alien.style.left = '70%';

        container.appendChild(alien);
    }

    aliensNaFase = 3;
}

function perderVida() {
    if (perdeuVida || gameOver) return;

    perdeuVida = true;
    vidas--;
    vidaDisplay.textContent = `LIFE: ${vidas}`;

    naveBloco.style.display = 'none';

    isPaused = true;
    pausarAliens(true);
    pararCronometro();

    telaPausa.textContent = vidas <= 0 ? 'GAME OVER' : 'YOU LOSE';
    telaPausa.style.display = 'flex';

    if (vidas <= 0) {
        gameOver = true;
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keypress", handleKeyPress);
    } else {
        const aliens = document.querySelectorAll('.alien');
        aliens.forEach(alien => {
            alien.style.animation = 'none';
            alien.style.top = '-500px';
            void alien.offsetWidth; 
        });

        resetarMissil(missilEsquerdo, () => {
            podeAtirarEsquerdo = true;
        });
        resetarMissil(missilDireito, () => {
            podeAtirarDireito = true;
        });

        perderVidaTimeout = setTimeout(() => {
            telaPausa.style.display = 'none';
            isPaused = false;
            pausarAliens(false);
            iniciarCronometro();
            naveBloco.style.display = 'flex';
            perdeuVida = false;
            
            iniciarAliens();
        }, 2000);
    }
}

// EVENTOS DE TECLADO
function handleKeyPress(event) {
    if (event.key.toLowerCase() === 'p' && !perdeuVida && !gameOver) {
        alternarPausa();
    }
}

function handleKeyDown(e) {
    if (perdeuVida || gameOver) return;

    if (e.code === 'Space' && (podeAtirarEsquerdo || podeAtirarDireito) && !isPaused) {
        e.preventDefault();

        if (!naveDeveMover) {
            naveDeveMover = true;
            iniciarAliens();
        }

        iniciarSequenciaDisparo();
    }

    if (!isPaused) {
        if (e.key.toLowerCase() === 'a') {
            moverNave(-velocidadeNave);
            e.preventDefault();
        } else if (e.key.toLowerCase() === 'd') {
            moverNave(velocidadeNave);
            e.preventDefault();
        }
    }
}

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('area-jogo').style.backgroundImage = backgrounds[0];
    
    iniciarCronometro();
    naveBloco.style.left = posicaoNave + '%';
    vidaDisplay.textContent = `LIFE: ${vidas}`;
    alienCountDisplay.textContent = `ALIEN: ${aliensAbatidos}`;

    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("keydown", handleKeyDown);
    setInterval(verificarColisaoMissilAlien, 50);
    setInterval(verificarColisao, 50);
});
