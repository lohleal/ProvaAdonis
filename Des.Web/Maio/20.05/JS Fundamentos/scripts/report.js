const data_reports = []

function addReport() {

    // Obtém referência do formulário
    const form = document.querySelector('#formReport');
    // Obtém o valor dos campos de entrada
    const input_data = form.querySelector('input[name="data"]');
    const input_assunto = form.querySelector('select[name="assunto"]');
    const input_agente = form.querySelector('select[name="agente"]');

    const opcaoAssunto = input_assunto.options[input_assunto.selectedIndex];
    const opcaoAgente = input_agente.options[input_agente.selectedIndex];

    // Caixinha
    const infos = {
        data: input_data.value,
        assunto: opcaoAssunto.textContent,
        agente: opcaoAgente.textContent,
        id: data_reports.length + 1
    };

    data_reports.push(infos);
    addTableReport(infos);
    
    drawChart();
    
    // RESET CAMPOS
    form. reset()
}

function addTableReport(infos) {
    
    // TABELA
    // Obtém referência da tabela
    const table = document.querySelector('#table_report');

    // Cria um elemento <tr>
    const line = document.createElement('tr');
    // Cria um elemento <td>
    const col_id = document.createElement('td');
    const col_data = document.createElement('td');
    const col_assunto = document.createElement('td');
    const col_agente = document.createElement('td');

    // Insere o conteúdo que será exigido pelo <td> 
    col_id.textContent = infos.id;
    col_data.textContent = infos.data;
    col_assunto.textContent = infos.assunto;
    col_agente.textContent = infos.agente;

    // Adiciona os elementos <td> ao elemento <tr>
    line.appendChild(col_id);
    line.appendChild(col_data);
    line.appendChild(col_assunto);
    line.appendChild(col_agente);

    // Adiciona o elemento <tr> ao elemento <table>
    table.appendChild(line);
}
