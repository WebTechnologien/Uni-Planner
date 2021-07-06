
function handleModuleModal() {
    const modules = document.querySelectorAll('.module-draggable');

    modules.forEach(module => {
        module.addEventListener('click', openModal);
    });

    function openModal(event) {
        initModal(document.getElementById("modal"))
        event.stopPropagation();
        document.querySelectorAll(".highlighted").forEach(el=>{
            el.classList.remove("elevation")
        })

        const modal = document.getElementById("modal");

        module_i = getIndexOfModule(event.currentTarget.id);
        module = sem[module_i[0]][module_i[1]];

        const modal_title = document.querySelector('.modal-header .title');
        modal_title.innerHTML=module.modulID+": "+ module.titel_long;

        let modal_body = document.getElementById("modal-body");

        let elClone = modal_body.cloneNode(false);
        modal_body.parentNode.replaceChild(elClone, modal_body);
        modal_body = document.getElementById("modal-body");

        let table = document.createElement("table");
        const attr = ["Creditpoints", "Semester", "Verantwortung", "Dozent", "Inhalte", "Prüfungsleistung", "Prüfungsvorleistung","Voraussetzungen"];

        for (const attrKey of attr) {

            if (module.hasOwnProperty(attrKey)) {
                let row = table.insertRow();
                let d = row.insertCell();

                d.appendChild(document.createTextNode(attrKey));
                row.appendChild(d);
                let d2 = row.insertCell();
                let data = document.createElement("div");
                data.innerHTML=module[attrKey];
                if(attrKey==="Semester"&&parseInt(module[attrKey])===0){
                    data.innerHTML= "alle (Wahlpflichtmodul)";
                }
                d2.appendChild(data);
                row.appendChild(d2);
            }
        }
        modal_body.appendChild(table);
    }
}

function initModal(modal){
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%"
    const closeBtn = document.querySelector('#'+modal.id+' .close-button');
    const overlay = document.getElementById('overlay');
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    modal.classList.add('visible');
    overlay.classList.add('visible');
}

function closeModal() {
    const modals = document.getElementsByClassName("modal");
    for (const modalElement of modals) {
        modalElement.classList.remove('visible');
    }
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('visible');
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
}




