(function(){
    const horas = document.querySelector('#horas');
    if(horas){
        const categoria = document.querySelector('[name="categoria_id"]');
        const dias = document.querySelectorAll('[name="dia"]');
        const inputHiddenDia = document.querySelector('[name="dia_id"]');
        const inputHiddenHora = document.querySelector('[name="hora_id"]');

        categoria.addEventListener('change', terminoBusqueda);
        dias.forEach( dia => dia.addEventListener('change', terminoBusqueda) );

        let busqueda = {
            categoria_id: +categoria.value || '',
            dia: +inputHiddenDia.value || '',
        };

        if(!Object.values(busqueda).includes('')){
            ( async () => {
                await buscarEventos();
                // Resaltar hora actual
                const horaSelecionada = document.querySelector(`[data-hora-id="${inputHiddenHora.value}"]`);
                horaSelecionada.classList.remove('horas__hora--deshabilitada');
                horaSelecionada.classList.add('horas__hora--selecionado');

                horaSelecionada.onclick = selecionarHora;
            })()

        }

        function terminoBusqueda(e){
            busqueda[e.target.name] = e.target.value;

            // Reiniciar los campos ocultos y el selectora de horas
            inputHiddenHora.value = '';
            inputHiddenDia.value = '';

            // Desabilitar hora previa
            const horaPrevia = document.querySelector('.horas__hora--selecionado');
            if(horaPrevia){
                horaPrevia.classList.remove('horas__hora--selecionado');
            }

            if(Object.values(busqueda).includes('')){
                return;
            }
            buscarEventos();
        }

        async function buscarEventos(){
            const { dia, categoria_id } = busqueda;
            const url = `/api/eventos-horario?dia_id=${dia}&categoria_id=${categoria_id}`;
            
            const respuesta = await fetch(url);
            const eventos = await respuesta.json();

            obtenerHorasDisponibles(eventos);
        }

        function obtenerHorasDisponibles(eventos){
            // Reiniciar las horas
            const listadoHoras = document.querySelectorAll('#horas li');
            listadoHoras.forEach(li => li.classList.add('horas__hora--deshabilitada'));
            listadoHoras.forEach(li => li.removeEventListener('click', selecionarHora));


            // Comprobar eventos ya tomados y quitar la clase deshabilitado
            const horasTomadas = eventos.map( evento => evento.hora_id);
            const listadoHorasArray = Array.from(listadoHoras);
            const resultado = listadoHorasArray.filter(li => !horasTomadas.includes(li.dataset.horaId))
            resultado.forEach(li => li.classList.remove('horas__hora--deshabilitada'));

            const horasDisponibles = document.querySelectorAll('#horas li:not(.horas__hora--deshabilitada)');
            horasDisponibles.forEach(hora => hora.addEventListener('click', selecionarHora));
        }

        function selecionarHora(e){
            // Desabilitar hora previa
            const horaPrevia = document.querySelector('.horas__hora--selecionado');
            if(horaPrevia){
                horaPrevia.classList.remove('horas__hora--selecionado');
            }
            // Agregar clase de selecionado
            e.target.classList.add('horas__hora--selecionado');
            inputHiddenHora.value = e.target.dataset.horaId;

            // Llenar el campo oculto de dia
            inputHiddenDia.value = busqueda.dia;
        }


    }
})();