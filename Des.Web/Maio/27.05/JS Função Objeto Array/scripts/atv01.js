function ex01() {
    
    const form = document.querySelector('#form01')
    const input = form.querySelector('input[name="in_01"]').value

    //Apartir daqui
    const array = input.split(' ');
    
    const resultado = resolve01(...array);

    document.getElementById('output').innerText = "Média: " + resultado;
   
    alert(input)
    form.reset()
}

function resolve01() {

    //Apartir daqui
    let soma = 0; 
    let quantidade = arguments.length;

    for(let i in arguments) {
        soma += Number(arguments[i]);
    }

    if(quantidade === 0) {
        return 0;
    }

    return soma / quantidade;
} 



