
function handleModuleModal() {
    const modules = document.querySelectorAll('.module-draggable');
    const closeBtn = document.querySelector('.close-button');
    const overlay = document.getElementById('overlay');
    modules.forEach(module => {
        module.addEventListener('click', openModal);
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);


    function openModal(event) {

        const modal = document.getElementById("modal");
        modal.classList.add('visible');
        overlay.classList.add('visible');

        module_i = getIndexOfModule(event.currentTarget);
        module = sem[module_i[0]][module_i[1]];

        const modal_title = document.querySelector('.modal-header .title');
        modal_title.innerHTML=module.titel;

        const modal_body = document.querySelector('.modal-body');
        // modal_body.innerHTML= "Semester: "+module.semester+"<br> Plan: "+module.planID+"<br> Geplant im Semester: "+module.listID+" an Stelle: "+ (module.posID * 1 + 1);

        let body = document.createElement("table");
        for(var e in module){

            if (module.hasOwnProperty(e)) {
                let row = body.insertRow();
                let d = row.insertCell();
                d.appendChild(document.createTextNode(e));
                row.appendChild(d);

                let d2 = row.insertCell();
                d2.appendChild(document.createTextNode(module[e]));
                row.appendChild(d2);
            }
        }
        modal_body.appendChild(body)
    }

    function closeModal() {
        const modal = document.getElementById("modal");
        const modal_body = document.querySelector('.modal-body');
        modal_body.innerHTML='';
        modal.classList.remove('visible');
        overlay.classList.remove('visible');
    }

}
