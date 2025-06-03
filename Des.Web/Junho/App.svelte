<script>
  import Display from './Display.svelte';
  import Keyboard from './Keyboard.svelte';

  let tela = '0';

  function adicionar(valor) {
    if (tela === '0') {
      tela = valor.toString();
    } 
	
	else {
      tela += valor.toString();
    }
  }

  function limpar() {
    tela = '0';
  }

  function calcular() {
    try {
      tela = eval(tela).toString();
    } catch {
      tela = 'Maybe have something wrong...';
    }
  }

  function teclado(key) {
    if (key === '=') {
      calcular();
    } 
	
	else if (key === 'C') {
      limpar();
    } 
	
	else {
      adicionar(key);
    }
  }
</script>

<h1>Calculadora Pink</h1>

<div class="calculadora">
  <Display valor={tela} />
  <Keyboard onButtonClick={teclado} />
</div>

<style>
  h1 {
    color: hotpink;
    text-align: center;
  }

  .calculadora {
    max-width: 300px;
    margin: 0 auto;
  }
</style>
