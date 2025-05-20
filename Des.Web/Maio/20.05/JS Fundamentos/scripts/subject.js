const data_subjects = []

function addSubject() {

    // Obtém referência do formulário
    const form = document.querySelector('#formSubject');
    // Obtém o valor dos campos de entrada
    const input_nome = form.querySelector('input[name="descricao"]');

    // Caixinha
    const infos = {
        descricao: input_nome.value,
        id: data_subjects.length + 1
    };

    data_subjects.push(infos);
    addTableSubject(infos);
    addSelectSubject(infos);

    drawChart();
    
    // RESET CAMPOS
    form. reset()
}

function addTableSubject(infos) {
    
    // TABELA
    // Obtém referência da tabela
    const table = document.querySelector('#table_subject');

    // Cria um elemento <tr>
    const line = document.createElement('tr');
    // Cria um elemento <td>
    const col_id = document.createElement('td');
    const col_nome = document.createElement('td');

    // Insere o conteúdo que será exigido pelo <td> 
    col_id.textContent = infos.id;
    col_nome.textContent = infos.descricao;

    // Adiciona os elementos <td> ao elemento <tr>
    line.appendChild(col_id);
    line.appendChild(col_nome);

    // Adiciona o elemento <tr> ao elemento <table>
    table.appendChild(line);
}

function addSelectSubject(infos) {

    // SELECT
    // Obtém referência do select
    const select = document.querySelector('#select_subject');
    // Cria um elemento <option>
    const op = document.createElement("option");

    // Insere o conteúdo que será exigido pelo <option>     
    op.textContent = infos.descricao;
    // Configura o valor que será retornado pelo <option> ao submeter o formuláro
    op.value = infos.id;
    
    // Adiciona o elemento <option> ao elemento <select>
    select.appendChild(op);
}
