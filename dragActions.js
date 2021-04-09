
function initEventListeners() {

    const semContainers = document.querySelectorAll('.semester-container');
    const modules = document.querySelectorAll('.module-draggable');

    semContainers.forEach(semContainer => {
        semContainer.addEventListener('dragover', onDragOver);
        semContainer.addEventListener('dragenter', onDragEnter);
        semContainer.addEventListener('dragleave', onDragLeave)
        semContainer.addEventListener('drop', onDrop)

    });

    modules.forEach(module => {
        module.addEventListener('dragstart', onDragStart);
        module.addEventListener('dragend', onDragEnd);
    });


    function onDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        modules.forEach(module=>{
            if(event.currentTarget!==module){
            module.classList.add('noPointer');
            console.log(module.style.pointerEvents)}
        })
        event.currentTarget.classList.add('hide');
    }

    function onDragOver(event) {
        event.preventDefault();
        event.currentTarget.classList.add('dragenter');

    }

    function onDragEnter(event) {
        event.preventDefault();
        console.log("entered")
    }

    function onDragLeave(event) {
        event.currentTarget.classList.remove('dragenter');
        console.log("left")
    }

    function onDrop(event) {
        const moduleID = event.dataTransfer.getData('text');
        const module = document.getElementById(moduleID);
        let target = event.currentTarget;
        target.appendChild(module);

        target.classList.remove('dragenter');
        event.dataTransfer.clearData();
    }

    function onDragEnd(event) {
        modules.forEach(module=>{
            module.classList.remove('noPointer');
        })
        event.currentTarget.classList.remove('hide');
    }
}