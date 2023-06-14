//querySelector (p, ul, #id, .class)

const contenidor = document.querySelector('.contenidor');
const seients = document.querySelectorAll('.fila .seient:not(.ocupat)');
const contador = document.getElementById('contador');
const total = document.getElementById('total');
const peliculaSelect = document.getElementById('pelicula');

let preuDelTicket = +peliculaSelect.value;

ompleUI();

function actualitzaSeleccioSeients() {
    
    const seientsSeleccionats = document.querySelectorAll('.fila .seient.seleccionat');
    //console.log(seientsSeleccionats);

    const seientsIndex = [...seientsSeleccionats].map((seient) => [...seients].indexOf(seient));

    localStorage.setItem('seientsSeleccionats', JSON.stringify(seientsIndex));

    const contadorSeientsSeleccionats = seientsSeleccionats.length;

    contador.innerText = contadorSeientsSeleccionats;
    total.innerText = preuDelTicket * contadorSeientsSeleccionats;
}

function guardaInfoPelicula(indexPelicula, preuPelicula) {

    localStorage.setItem('indexPeliculaSeleccionada', indexPelicula);
    localStorage.setItem('preuPeliculaSeleccionada', preuPelicula);
}

function ompleUI() {
    const seientsSeleccionats = JSON.parse(localStorage.getItem('seientsSeleccionats'));
    
    if (seientsSeleccionats !== null && seientsSeleccionats.length > 0) {
        seients.forEach((seient, index) => {
            if(seientsSeleccionats.indexOf(index) > -1) {
                seient.classList.add('seleccionat');
            }
        });
    }

    const indexPeliculaSeleccionada = localStorage.getItem('indexPeliculaSeleccionada');

    if (indexPeliculaSeleccionada !== null) {
        peliculaSelect.selectedIndex = indexPeliculaSeleccionada;
    }

    const preuPeliculaSeleccionada = localStorage.getItem('preuPeliculaSeleccionada');

    if (preuPeliculaSeleccionada !== null) {
        preuDelTicket = +preuPeliculaSeleccionada;
    }
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

    guardaInfoPelicula(e.target.selectedIndex, e.target.value);
    actualitzaSeleccioSeients();
});

actualitzaSeleccioSeients();