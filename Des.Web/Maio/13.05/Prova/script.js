// VARIÁVEIS GLOBAIS
let tempo = 0;
let isPaused = false;
let intervalId;
let vidas = 3;
let aliensAbatidos = 0;
let gameOver = false;
let perdeuVida = false;
let faseAtual = 1;
let aliensDestruidosNaFase = 0;
let posicaoNave = 45;
const velocidadeNave = 2;
let proximoDisparo = 'esquerdo';
let podeAtirarEsquerdo = true;
let podeAtirarDireito = true;

// ELEMENTOS DO DOM
const valorTempo = document.querySelector('#valor');
const telaPausa = document.getElementById('tela-pausa');
const naveBloco = document.getElementById('nave-bloco');
const missilEsquerdo = document.getElementById('missil-esquerdo');
const missilDireito = document.getElementById('missil-direito');
const vidaDisplay = document.getElementById('vida');
const alienCountDisplay = document.getElementById('alien-count');
const areaJogo = document.getElementById('area-jogo');

// FUNDOS DAS FASES
const backgrounds = [
    'url(./images/background.png)',
    'url(./images/background2.jpg)',
    'url(./images/background3.jpg)',
    'url(./images/background4.jpg)'
];

// INICIALIZAÇÃO DO JOGO
function iniciarJogo() {
    areaJogo.style.backgroundImage = backgrounds[faseAtual - 1];
    iniciarCronometro();
    naveBloco.style.left = posicaoNave + '%';
    vidaDisplay.textContent = `LIFE: ${vidas}`;
    alienCountDisplay.textContent = `ALIEN: ${aliensAbatidos}`;
    
    // Criar aliens iniciais
    const container = document.getElementById('aliens-container');
    for (let i = 1; i <= 3; i++) {
        const alien = document.createElement('img');
        alien.className = 'alien';
        alien.src = './images/alien.png';
        alien.style.left = i === 1 ? '30%' : i === 2 ? '50%' : '70%';
        container.appendChild(alien);
    }
    iniciarAliens();
}

// SISTEMA DE TEMPO
function formatarTempo(segundos) {
    const horas = String(Math.floor(segundos / 3600)).padStart(2, '0');
    const minutos = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
    const segundosFormatados = String(segundos % 60).padStart(2, '0');
    return `${horas}:${minutos}:${segundosFormatados}`;
}

function atualizarTempo() {
    if (!isPaused) valorTempo.textContent = formatarTempo(++tempo);
}

function iniciarCronometro() {
    if (!intervalId) intervalId = setInterval(atualizarTempo, 1000);
}

function pararCronometro() {
    clearInterval(intervalId);
    intervalId = null;
}

// CONTROLES DO JOGO
function alternarPausa() {
    isPaused = !isPaused;
    telaPausa.style.display = isPaused ? 'flex' : 'none';
    pausarAliens(isPaused);
    isPaused ? pararCronometro() : iniciarCronometro();
}

function moverNave(direcao) {
    posicaoNave = Math.max(0, Math.min(90, posicaoNave + direcao));
    naveBloco.style.left = posicaoNave + '%';
}

// SISTEMA DE DISPARO
function iniciarSequenciaDisparo() {
    if (proximoDisparo === 'esquerdo' && podeAtirarEsquerdo) {
        dispararMissil(missilEsquerdo, 'esquerdo');
        proximoDisparo = 'direito';
    } 
    else if (proximoDisparo === 'direito' && podeAtirarDireito) {
        dispararMissil(missilDireito, 'direito');
        proximoDisparo = 'esquerdo';
    }
    else if (podeAtirarEsquerdo) {
        dispararMissil(missilEsquerdo, 'esquerdo');
    }
    else if (podeAtirarDireito) {
        dispararMissil(missilDireito, 'direito');
    }
}

function dispararMissil(missil, tipo) {
    if (missil.style.transform === 'translateY(-100vh)') return;
    
    if (tipo === 'esquerdo') podeAtirarEsquerdo = false;
    else podeAtirarDireito = false;

    missil.style.transition = 'transform 0.5s linear';
    missil.style.transform = 'translateY(-100vh)';
    missil.style.opacity = '1';
    
    missil.addEventListener('transitionend', () => {
        if (missil.style.opacity !== '0') resetarMissil(missil, tipo);
    }, { once: true });
}

function resetarMissil(missil, tipo) {
    missil.style.transition = 'none';
    missil.style.transform = 'translateY(0)';
    missil.style.opacity = '1';
    void missil.offsetWidth;
    
    if (tipo === 'esquerdo') podeAtirarEsquerdo = true;
    else podeAtirarDireito = true;
}

function resetarMisseis() {
    resetarMissil(missilEsquerdo, 'esquerdo');
    resetarMissil(missilDireito, 'direito');
    proximoDisparo = 'esquerdo';
}

// SISTEMA DE ALIENS
function iniciarAliens() {
    const duracao = Math.max(2, 10 - ((faseAtual - 1) * 2));
    document.querySelectorAll('.alien').forEach(alien => {
        alien.style.animation = `descerAlien ${duracao}s linear infinite`;
    });
}

function pausarAliens(pausar) {
    const estado = pausar ? 'paused' : 'running';
    document.querySelectorAll('.alien').forEach(alien => {
        alien.style.animationPlayState = estado;
    });
}

// SISTEMA DE COLISÃO
function verificarColisao() {
    if (isPaused || perdeuVida || gameOver) return;

    const naveRect = naveBloco.getBoundingClientRect();
    for (let alien of document.querySelectorAll('.alien')) {
        const alienRect = alien.getBoundingClientRect();
        if (alienRect.bottom >= naveRect.top &&
            alienRect.top <= naveRect.bottom &&
            alienRect.right >= naveRect.left &&
            alienRect.left <= naveRect.right) {
            perderVida();
            break;
        }
    }
}

function verificarColisaoMissilAlien() {
    const misseis = [
        { elemento: missilEsquerdo, tipo: 'esquerdo' },
        { elemento: missilDireito, tipo: 'direito' }
    ];
    
    misseis.forEach(({ elemento, tipo }) => {
        if (elemento.style.transform !== 'translateY(-100vh)') return;

        const missilRect = elemento.getBoundingClientRect();
        for (let alien of document.querySelectorAll('.alien')) {
            if (!alien || alien.style.display === 'none') continue;

            const alienRect = alien.getBoundingClientRect();
            if (missilRect.bottom >= alienRect.top &&
                missilRect.top <= alienRect.bottom &&
                missilRect.right >= alienRect.left &&
                missilRect.left <= alienRect.right) {
                
                elemento.style.transition = 'none';
                elemento.style.opacity = '0';
                alien.remove();
                
                setTimeout(() => resetarMissil(elemento, tipo), 50);
                
                aliensAbatidos++;
                aliensDestruidosNaFase++;
                alienCountDisplay.textContent = `ALIEN: ${aliensAbatidos}`;

                verificarFase();
                break;
            }
        }
    });
}

function verificarFase() {
    if (aliensDestruidosNaFase >= 3) {
        resetarMisseis();
        
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
        areaJogo.style.backgroundImage = backgrounds[faseAtual - 1];
        
        const container = document.getElementById('aliens-container');
        container.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            const alien = document.createElement('img');
            alien.className = 'alien';
            alien.src = './images/alien.png';
            alien.style.left = i === 1 ? '30%' : i === 2 ? '50%' : '70%';
            container.appendChild(alien);
        }

        iniciarAliens();
    }
}

function perderVida() {
    if (perdeuVida || gameOver) return;

    perdeuVida = true;
    vidaDisplay.textContent = `LIFE: ${--vidas}`;
    naveBloco.style.display = 'none';
    resetarMisseis();

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
        document.querySelectorAll('.alien').forEach(alien => {
            alien.style.animation = 'none';
            alien.style.top = '-500px';
        });

        setTimeout(() => {
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

// CONTROLES DE TECLADO
function handleKeyPress(event) {
    if (event.key.toLowerCase() === 'p' && !perdeuVida && !gameOver) {
        alternarPausa();
    }
}

function handleKeyDown(e) {
    if (perdeuVida || gameOver) return;

    if (e.code === 'Space' && (podeAtirarEsquerdo || podeAtirarDireito) && !isPaused) {
        e.preventDefault();
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
document.addEventListener("DOMContentLoaded", () => {
    iniciarJogo();
    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("keydown", handleKeyDown);
    setInterval(verificarColisaoMissilAlien, 50);
    setInterval(verificarColisao, 50);
});
