const form1 = document.getElementById('paso1')
const form2 = document.getElementById('paso2')
const form3 = document.getElementById('paso3')

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

btn1.addEventListener('click', () =>{
    form1.style.display="none"
    form2.style.display = '';
    
})
btn2.addEventListener('click', () =>{
    form2.style.display="none"
    form3.style.display = '';

})
