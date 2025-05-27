function ex02() {
    
    const form = document.querySelector('#form02')
    const input = form.querySelector('input[name="in_02"]').value
    
    //Apartir daqui
    const array = input.split(' ');
    
    const resultado = resolve02(...array);

    document.getElementById('output').innerText = "Média Refatorada: " + resultado;

    alert(input)
    form.reset()
}

let resolve02 = (...array) => {

    let soma = 0; 
    let quantidade = array.length;

    array.forEach( (numero) => soma += Number(numero));
    return soma / quantidade;
};
