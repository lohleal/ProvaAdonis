// Botão voltar
document.getElementById('botaoVoltar').addEventListener('click', function() {
    window.location.href = "../inicio/inicio.html";
  });
  
  // Login
  document.getElementById('botaoConfirmar').addEventListener('click', function() {
    const identificacao = document.getElementById('inputIdentificacao').value;
    const password = document.getElementById('inputPassword').value;
  
    const lider = {
      identificacao: 'Líder',
      password: '20031996'
    };
  
    const funcionario = {
      identificacao: '1234',
      password: '1234'
    };

    const modal = document.getElementById('modalErro');
  
    if (identificacao === lider.identificacao && password === lider.password) {
      window.location.href = "../homes/lider/homeLider.html";
    } 
    
    else if (identificacao === funcionario.identificacao && password === funcionario.password) {
      window.location.href = "../homes/funcionario/homeFuncionario.html";
    } 
    
    else {
        modal.classList.add('show');

        setTimeout(() => {
          modal.classList.remove('show');
        }, 3000);
    }
});