const form1 = document.getElementById('paso1');
const form2 = document.getElementById('paso2');
const form3 = document.getElementById('paso3');

const modalActiva = document.getElementById('overlay')
const cancelarModal = document.getElementById('cancelar')


const btn1 = document.getElementById('btn1');
const btnAtras = document.getElementById('btn-prev');

let pasoActual = 0;

const barra = document.querySelector('.relleno');


// avanzar de formulario
const NextForm = ()=>{
    if(pasoActual === 0){
        form2.style.display = '';
        form1.style.display = 'none';
        barra.style.width = '35%';
        return pasoActual++;

    }else if(pasoActual === 1){

        form3.style.display = '';
        form2.style.display = 'none';
        barra.style.width = '75%';
        return pasoActual++;
    }else{
        barra.style.width = '100%';
        
        return pasoActual++;
    }
}
// ----------------------------------------------

// volver de formulario
const BackFrom = ()=>{
    if(pasoActual === 1){
        form1.style.display = '';
        form2.style.display = 'none';
        barra.style.width = '0%';
        return pasoActual-- ;
    }
    else if (pasoActual === 2 ){
        form2.style.display = '';
        form3.style.display = 'none';
        barra.style.width = '35%';
        return pasoActual-- ;
    }
    else if(pasoActual === 3){
        form3.style.display = ''
        barra.style.width = '75%';
        return pasoActual--
    }
}
// ---------------------------------------

// Modal para confirmar formulario
const ModalAlerta = () => pasoActual === 3 ? modalActiva.classList.add("active"): '';


btn1.addEventListener('click',() =>{
    // validar formulario completo y datos correctos

    // -----------------------
    NextForm();
    ModalAlerta()
    console.log(pasoActual)

})

btnAtras.addEventListener('click', () =>{
    BackFrom()
    console.log(pasoActual)
})

cancelarModal.addEventListener('click', ()=>{
    modalActiva.classList.remove("active")
} )