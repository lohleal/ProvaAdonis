const data_agents = []

function addAgent() {

    // Obtém referência do formulário
    const form = document.querySelector('#formAgent');
    // Obtém o valor dos campos de entrada
    const input_nome = form.querySelector('input[name="nome"]');
    const input_regional = form.querySelector('select[name="regional"]')

    const opcaoSelecionada = input_regional.options[input_regional.selectedIndex];
    
    // Caixinha
    const infos = {
        nome: input_nome.value,
        regionalId: opcaoSelecionada.value,
        regionalSigla: opcaoSelecionada.textContent,
        id: data_agents.length + 1
    };

    data_agents.push(infos);
    addTableAgent(infos);
    addSelectAgent(infos);

    drawChart();
    
    // RESET CAMPOS
    form. reset()
}

function addTableAgent(infos) {
    
    // TABELA
    // Obtém referência da tabela
    const table = document.querySelector('#table_agent');

    // Cria um elemento <tr>
    const line = document.createElement('tr');
    // Cria um elemento <td>
    const col_id = document.createElement('td');
    const col_nome = document.createElement('td');
    const col_regional = document.createElement('td');

    // Insere o conteúdo que será exigido pelo <td> 
    col_id.textContent = infos.id;
    col_nome.textContent = infos.nome;
    col_regional.textContent = infos.regionalSigla;

    // Adiciona os elementos <td> ao elemento <tr>
    line.appendChild(col_id);
    line.appendChild(col_nome);
    line.appendChild(col_regional);

    // Adiciona o elemento <tr> ao elemento <table>
    table.appendChild(line);
}

function addSelectAgent(infos) {

    // SELECT
    // Obtém referência do select
    const select = document.querySelector('#select_agent');
    // Cria um elemento <option>
    const op = document.createElement("option");

    // Insere o conteúdo que será exigido pelo <option>     
    op.textContent = infos.nome;
    // Configura o valor que será retornado pelo <option> ao submeter o formuláro
    op.value = infos.id;
    
    // Adiciona o elemento <option> ao elemento <select>
    select.appendChild(op);
}
