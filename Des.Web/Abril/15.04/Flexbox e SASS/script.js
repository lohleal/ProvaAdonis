const boxes = document.querySelectorAll('.box');
const cores = document.querySelectorAll('.flex-container > div');
const quadrado = document.querySelector('.quadrado');
const circulo = document.querySelector('.circulo');

//cor escolhida
let corSelecionada = '#000000';

cores.forEach(cor => {
    cor.addEventListener('click', () => {
        corSelecionada = cor.style.backgroundColor;

        boxes.forEach(box => {
            box.style.background = corSelecionada;
        });

        quadrado.style.backgroundColor = corSelecionada;
        circulo.style.backgroundColor = corSelecionada;

        cores.forEach(c => c.classList.remove('selecionado'));
        cor.classList.add('selecionado');
    });
});

quadrado.addEventListener('click', () => {
    boxes.forEach(box => {
        box.style.borderRadius = '0%';
    });

    quadrado.classList.add('selecionado');
    circulo.classList.remove('selecionado');
})

circulo.addEventListener('click', () => {
    boxes.forEach(box => {
        box.style.borderRadius = '50%';
        });

        circulo.classList.add('selecionado');
        quadrado.classList.remove('selecionado');
});


function alterarTamanho() {
    const tamanho = document.getElementById('tamanho').value;
    const boxes = document.querySelectorAll('.box');
  
    boxes.forEach(box => {
      box.style.width = tamanho + '%';
      box.style.paddingTop = tamanho + '%'; 
    });
  }
  
  function atualizarAlinhamento() {
    const area = document.getElementById('area');
  
    const flexDirection = document.getElementById('flex-Direction').value;
    const justifyContent = document.getElementById('justify-Content').value;
    const alignItems = document.getElementById('align-Items').value;
  
    area.style.flexDirection = flexDirection;
    area.style.justifyContent = justifyContent;
    area.style.alignItems = alignItems;
  }
  
