const form1 = document.getElementById('paso1');
const form2 = document.getElementById('paso2');
const form3 = document.getElementById('paso3');

const btn1 = document.getElementById('btn1');
const btnAtras = document.getElementById('btn-prev');

const pasoActual = [form1,form2,form3];

const barra = document.querySelector('.relleno');

btn1.addEventListener('click', () =>{
    // validar datos

    // -----------------------
    for (let i = 0; i < pasoActual.length; i++) {
        if(pasoActual[i]===form1){
            form1.style.display="none"
            form2.style.display = '';
            barra.style.width = '35%';
            return pasoActual[i]
        }
        else if(pasoActual[i]===form2){
            form2.style.display="none"
            form3.style.display = '';
            barra.style.width = '75%';
            return pasoActual[i]
        }
        else{
            barra.style.width = '100%'
        }
    }
})

btnAtras.addEventListener('click',() =>{
    form1.style.display = '';
    form2.style.display = 'none';
    barra.style.width = '0%';
})