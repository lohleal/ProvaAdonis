//Contagem de tempo

//Variáveis
let tempo = 0;
let isPaused = false;
let id;

//Contador
const valor = document.querySelector('#valor');

// Converter
function formatTime(seconds) {
    const horas = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutos = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const segundos = String(seconds % 60).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`; 
}

//Atualizar
function add() {
    if (!isPaused) {
        tempo++;
        valor.textContent = formatTime(tempo);
    }
}

//Iniciar 
function startCounter() {
    if (!id) {
        id = setInterval(add, 1000);
    }
}

//Parar
function stopCounter() {
    clearInterval(id);
    id = null;
}

//Alternar p
document.addEventListener("keypress", function(event) {
    if (event.key.toLowerCase() === 'p') {
        isPaused = !isPaused;
    }
});


//Disparo do missil

//Controle
const missilEsquerdo = document.getElementById('missil-esquerdo');
const missilDireito = document.getElementById('missil-direito');
let podeAtirar = true;

//Disparo com a tecla 
document.addEventListener("keydown", function(e) {
    if(e.code === 'Space' && podeAtirar) {
        e.preventDefault();
        iniciarSequenciaDisparo();
    }
});

function iniciarSequenciaDisparo() {
    podeAtirar = false;

    //Disparo 1
    dispararMissil(missilEsquerdo, () => {

        //Disparo 2 
        dispararMissil(missilDireito, () => {

            resetarMisseis();
            podeAtirar = true;
        });
    });
}

function dispararMissil(missil, callback) {
    missil.style.transition = 'transform 0.5s linear';
    missil.style.transform = 'translateY(-100vh)';

    //Faz com que o direito seja apos o esquerdo
    missil.addEventListener('transitionend', () => callback(), {once: true});
}

function resetarMisseis() {
    missilEsquerdo.style.transition = 'none';
    missilDireito.style.transition = 'none';

    missilEsquerdo.style.transform = 'translateY(0)';
    missilDireito.style.transform = 'translateY(0)';

    setTimeout(() => {
        missilEsquerdo.style.transition = 'transform 0.5s linear';
        missilDireito.style.transition = 'transform 0.5s linear';
    }, 10);
}

document.addEventListener("DOMContentLoaded", function() {
    startCounter();
});
