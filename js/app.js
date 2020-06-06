import * as ui from './interfaz.js';
import {API} from './api.js';

ui.formulario.addEventListener('submit', (e) => {
     e.preventDefault();
     //obtener datos del formulario
     const artista = document.getElementById('artista').value,
          cancion = document.getElementById('cancion').value;
     //por si hace submit con algún campo vacío
     if( artista === '' || cancion === '' ) {
          ui.mensaje.innerHTML = `<p> ¡ERROR!: Todos los campos son obligatorios </p>`;
          ui.mensaje.classList.add('error');
          setTimeout(() => {
               ui.mensaje.innerHTML = '';
               ui.mensaje.classList.remove('error');               
          },2750);
     } else {
     //el formulario está completo, se procede a consultar la API
          const api = new API(artista,cancion);
          api.consultarAPI()
               .then(dato => { 
                    if(dato.lyrics) {
                         const lyrics = document.createElement('p');
                         lyrics.textContent = `${dato.lyrics}`;
                         ui.resultado.appendChild(lyrics);
                    } else {                         //
                         ui.mensaje.innerHTML = `<p> NO SE ENCONTRÓ LA LETRA DE LA CANCIÓN QUE BUSCAS :C </p>`;
                         ui.mensaje.classList.add('error');
                         setTimeout(() => {
                              ui.mensaje.innerHTML = '';
                              ui.mensaje.classList.remove('error');  
                              ui.formulario.reset();             
                         },3000);
                    }
               });
     }
});