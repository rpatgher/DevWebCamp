(function() {
    const tagInput = document.querySelector('#tags_input');
    if(tagInput){

        const tagsDiv = document.querySelector('#tags');
        const tagsInputHidden = document.querySelector('[name="tags"]');

        let tags = [];

        // Recuperar del input oculto
        if(tagsInputHidden.value !== ''){
            tags = tagsInputHidden.value.split(',');
            mostrarTags();
        }

        // Escuchar los cambios en el input
        tagInput.addEventListener('keypress', guardarTag);


        function guardarTag(e){
            if(e.keyCode === 44){
                if(e.target.value.trim() === '' || e.target.value < 1 || e.target.value.includes(',')){
                    return;
                }
                e.preventDefault();
                tags = [...tags, e.target.value.trim()];
                tagInput.value = '';

                mostrarTags();
            }
        }

        function mostrarTags(){
            tagsDiv.textContent = '';

            tags.forEach(tag => {
                const etiqueta = document.createElement('LI');
                etiqueta.classList.add('formulario__tag');
                etiqueta.textContent = tag;
                tagsDiv.appendChild(etiqueta);
                etiqueta.ondblclick = eliminarTag;
            });

            acuualizarInputHidden();
        }

        function eliminarTag(e){
            e.target.remove();
            tags = tags.filter(tag => tag !== e.target.textContent);
            acuualizarInputHidden();
        }

        function acuualizarInputHidden(){
            tagsInputHidden.value = tags.toString();
        }
    }
})();
