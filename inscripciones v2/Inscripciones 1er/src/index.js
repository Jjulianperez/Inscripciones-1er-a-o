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

    }
    else if(pasoActual === 1){

        form3.style.display = '';
        form2.style.display = 'none';
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
        pasoActual--
        return pasoActual; 
    }
}
// ---------------------------------------
    const validarPaso = () => {
    let errores = [];
    
    if (pasoActual === 0) {
        // Paso Alumno
        const nombre = document.getElementById("alumno-nombre").value.trim();
        const apellido = document.getElementById("alumno-apellido").value.trim();
        const edad = document.getElementById("edad").value.trim();
        const dni = document.getElementById("alumno-dni").value.trim();
        const email = document.getElementById("email").value.trim();

        if (nombre.length < 2) errores.push("El nombre debe tener al menos 2 caracteres.");
        if (apellido.length < 2) errores.push("El apellido debe tener al menos 2 caracteres.");
        if (!/^\d+$/.test(edad) || edad < 10 || edad > 20) errores.push("La edad debe ser un número entre 10 y 20.");
        if (!/^\d{7,8}$/.test(dni)) errores.push("El DNI debe tener 7 u 8 números.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.push("El email no es válido.");
    }

    if (pasoActual === 1) {
        // Paso Tutor
        const nombreTutor = document.getElementById("tutor-nombre").value.trim();
        const apellidoTutor = document.getElementById("tutor-apellido").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const dniTutor = document.getElementById("tutor-dni").value.trim();

        if (nombreTutor.length < 2) errores.push("El nombre del tutor es obligatorio.");
        if (apellidoTutor.length < 2) errores.push("El apellido del tutor es obligatorio.");
        if (!/^\d{7,15}$/.test(telefono)) errores.push("El teléfono debe tener entre 7 y 15 números.");
        if (!/^\d{7,8}$/.test(dniTutor)) errores.push("El DNI del tutor debe tener 7 u 8 números.");
    }

    return errores;
};


// ------------------------------------------

// Modal para confirmar formulario
const ModalAlerta = () => {
     if(pasoActual === 3){
        modalActiva.classList.add("active")
    }
    else{
        modalActiva.classList.add("")
    }
}


btn1.addEventListener('click', () => {
    const errores = validarPaso();
    const divErrores = document.querySelectorAll(".errores")[pasoActual];

    divErrores.innerHTML = ""; // limpiar

    if (errores.length > 0) {
        divErrores.innerHTML = errores.join("<br>");
        return;
    }

    NextForm();
    ModalAlerta();
    console.log(pasoActual);
});

btnAtras.addEventListener('click', () =>{
    BackFrom()
    console.log(pasoActual)
})

cancelarModal.addEventListener('click', ()=>{
    modalActiva.classList.remove("active")
} )