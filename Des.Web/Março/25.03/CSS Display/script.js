const imagens = {
    filme: ["capaCD.jpg", "capaEP.jpg", "capaPS.jpg", "capaRS.jpg"],
    barbie: ["bCD.jpg", "bEP.jpg", "bPS.jpg", "bRS.jpg"],
    ken: ["ken.jpg", "kenCD.jpg", "kenEP.jpg", "ryan.jpg"]
  };
  
  function iniciarJogo(tipo) {
 
    document.querySelector(".container-card").classList.add("esconder");
  
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = ""; 
    tabuleiro.classList.remove("esconder"); 
  
    let selecionarImagens = imagens[tipo];
  
    let imagensJogo = [...selecionarImagens, ...selecionarImagens];
  
    imagensJogo = imagensJogo.sort(() => Math.random() - 0.5);
  
    imagensJogo.forEach(img => {
      const card = document.createElement("div");
      card.classList.add("card-jogo");
      card.onclick = () => virarCarta(card);
  
      const imagemCard = document.createElement("img");
      imagemCard.src = img;
  
      card.appendChild(imagemCard);
      tabuleiro.appendChild(card);
    });
  }
  
  function virarCarta(card) {
    card.classList.add("virar");

    card.addEventListener('dblclick', () => {
        card.classList.toggle("virar"); 
    });
  }
  
