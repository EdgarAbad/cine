//querySelector (p, ul, #id, .class)

const contenidor = document.querySelector('.contenidor');
const seients = document.querySelectorAll('.fila .seient:not(.ocupat)');
const contador = document.getElementById('contador');
const total = document.getElementById('total');
const peliculaSelect = document.getElementById('pelicula');

let preuDelTicket = +peliculaSelect.value;

function actualitzaSeleccioSeients() {
    
    const seientsSeleccionats = document.querySelectorAll('.fila .seient.seleccionat');
    //console.log(seientsSeleccionats);

    const seientsIndex = [...seientsSeleccionats].map((seient) => [...seients].indexOf(seient));

    localStorage.setItem('seientsSeleccionats', JSON.stringify(seientsIndex));

    const contadorSeientsSeleccionats = seientsSeleccionats.length;

    contador.innerText = contadorSeientsSeleccionats;
    total.innerText = preuDelTicket * contadorSeientsSeleccionats;
}

contenidor.addEventListener('click', (e) => {

    if(e.target.classList.contains('seient')
    && !e.target.classList.contains('ocupat')) {
       
       
        e.target.classList.toggle('seleccionat');
        actualitzaSeleccioSeients();
    }
});

peliculaSelect.addEventListener('change', (e) => {
    preuDelTicket = +e.target.value;

    actualitzaSeleccioSeients();
});