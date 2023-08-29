import Swal from 'sweetalert2';

(function(){
    let eventos = [];

    const resumen = document.querySelector('#registro-resumen');
    if(resumen){
        const eventosBoton = document.querySelectorAll('.evento__agregar');
        eventosBoton.forEach(eventoBoton => eventoBoton.addEventListener('click', seleccionarEvento));
        
        const formularioRegistro= document.querySelector('#registro');
        formularioRegistro.addEventListener('submit', submitFormulario);
        
        mostrarEventos();

        function seleccionarEvento({target}){
            if(eventos.length < 5){
                // Deshabilitar el evento
                target.disabled = true;
                eventos = [...eventos, {
                    id: target.dataset.id,
                    titulo: target.parentElement.querySelector('.evento__nombre').textContent.trim()
                }];
                mostrarEventos();
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Máximo puedes agregar 5 eventos por registro',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    
        function mostrarEventos(){
            limpiarEventos();
            if(eventos.length > 0){
                eventos.forEach(evento => {
                    const eventoDOM = document.createElement('DIV');
                    eventoDOM.classList.add('registro__evento');
    
                    const titulo = document.createElement('H3');
                    titulo.classList.add('registro__nombre');
                    titulo.textContent = evento.titulo;
    
                    const botonEliminar = document.createElement('BUTTON');
                    botonEliminar.classList.add('registro__eliminar');
                    botonEliminar.innerHTML = `<i class="fa-solid fa-trash"></i>`;
                    botonEliminar.onclick = () => {
                        eliminarEvento(evento.id);
                    };
    
                    eventoDOM.appendChild(titulo);
                    eventoDOM.appendChild(botonEliminar);
                    resumen.appendChild(eventoDOM);
                });
            }else{
                const noRegistros = document.createElement('P');
                noRegistros.textContent = 'No hay eventos. Añade hasta 5 del lado izquierdo.';
                noRegistros.classList.add('registro__texto');

                resumen.appendChild(noRegistros);
            }
        }
    
        function eliminarEvento(id){
            eventos = eventos .filter(evento => evento.id !== id);
            const botonAgregar = document.querySelector(`[data-id="${id}"]`);
            botonAgregar.disabled = false;
            mostrarEventos();
        }
    
        function limpiarEventos(){
            while(resumen.firstChild){
                resumen.removeChild(resumen.firstChild);
            }
        }

        async function submitFormulario(e){
            e.preventDefault();
            // Obtener el valor del regalo
            const regaloId = document.querySelector('#regalo').value;

            const eventosId = eventos.map(evento => evento.id);

            // Validar si ya hay eventos seleccionados, así como el regalo
            if(eventosId.length === 0 || regaloId === ''){
                Swal.fire({
                    title: 'Error',
                    text: 'Debes seleecionar al menos un Evento, así como un Regalo',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
            const url = '/finalizar-registro/conferencias';

            const datos = new FormData();
            datos.append('eventos', eventosId);
            datos.append('regalo_id', regaloId);


            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
            const resultado = await respuesta.json();

            if(resultado.resultado){
                Swal.fire(
                    'Registro Exitoso',
                    'Tus conferencias se han almacenado y tu registro fue existoso. Te esperamos en DevWebCamp.',
                    'success'
                ).then(() => location.href = `/boleto?id=${resultado.token}`);
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error. Intenta Nuevamente',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => location.reload() );
            }
        }
    }
})()