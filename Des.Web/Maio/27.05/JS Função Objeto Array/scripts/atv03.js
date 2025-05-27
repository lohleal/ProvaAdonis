function ex03() {
    
    const form = document.querySelector('#form03')
    const input = form.querySelector('input[name="in_03"]').value
   
    //Apartir daqui
    const arrayString = input.split(' ');
    const arrayNumero = arrayString.map(item => Number(item));
    
    const resultado = resolve03(...arrayNumero);

    document.getElementById('output').innerText = resultado.join(', ');
   
    alert(input)
    form.reset()
}

let resolve03 = (...arrayNumero) => {
    return arrayNumero.map(item => {
        return `${item} é ${isEven(item)}`;
    });
};

function isEven(val) {
    if(val%2 == 0) {
        return "PAR";
    }

    return "ÍMPAR"
}
