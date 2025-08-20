const forms = [
    document.getElementById('paso1'),
    document.getElementById('paso2'),
    document.getElementById('paso3')
]

const modalActiva = document.getElementById('overlay')
const cancelarModal = document.getElementById('cancelar')


const btn1 = document.getElementById('btn1');
const btnAtras = document.getElementById('btn-prev');

let pasoActual = 0;

const barra = document.querySelector('.relleno');


// avanzar de formulario
const NextForm = ()=>{
    if(pasoActual === 0){
        forms[1].style.display = '';
        forms[0].style.display = 'none';
        barra.style.width = '35%';
        return pasoActual++;

    }
    else if(pasoActual === 1){

        forms[2].style.display = '';
        forms[1].style.display = 'none';
        barra.style.width = '75%';
        return pasoActual++;
    }
    else{
        barra.style.width = '100%';
        pasoActual++;
        
        return pasoActual
    }
}
// ----------------------------------------------

// volver de formulario
const BackFrom = ()=>{
    if(pasoActual === 1){
        forms[0].style.display = '';
        forms[1].style.display = 'none';
        barra.style.width = '0%';
        return pasoActual-- ;
    }
    else if (pasoActual === 2 ){
        forms[2].style.display = '';
        forms[1].style.display = 'none';
        barra.style.width = '35%';
        return pasoActual-- ;
    }
    else if(pasoActual === 3){
        forms[2].style.display = ''
        barra.style.width = '75%';
        pasoActual--
        return pasoActual; 
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