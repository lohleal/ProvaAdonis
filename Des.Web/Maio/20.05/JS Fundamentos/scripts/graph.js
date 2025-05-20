function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['1', 'Total', { role: 'style' }],
        ['Agents', data_agents.length, 'pink'],
        ['Assuntos', data_subjects.length, 'lightpink'],
        ['Regionais', data_regionals.length, 'darkpink'],
        ['Relatorios', data_reports.length, 'purple']
    ]);

    var options = {
        legend: { position: 'none' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
    chart.draw(data, options);
}
