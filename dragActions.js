
function initEventListeners() {

    const semContainers = document.querySelectorAll('.semester');
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
        event.dataTransfer.clearData();
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
        event.preventDefault();
        const moduleID = event.dataTransfer.getData('text');
        const module = document.getElementById(moduleID);
        let target = event.currentTarget;

        if(module!=null){
            target.appendChild(module);
            moveModul(module,target.id)
            saveModules();
        }
        event.currentTarget.classList.remove('dragenter');

    }

    function onDragEnd(event) {
        modules.forEach(modules=>{
            modules.classList.remove('noPointer');
        })
        event.currentTarget.classList.remove('hide');
    }
}

    function moveModul(module, newIndex){
        let index = getIndexOfModule(module);
        let oldListIndex = index[0];
        let oldPosIndex = index[1];
        sem[newIndex].push(sem[oldListIndex][oldPosIndex]);
        sem[oldListIndex].splice(oldPosIndex,1);
    }

    function getIndexOfModule(module){
    console.log("searching for: "+module.id);
        for (let i = 0; i < sem.length; i++) {
            for (let j = 0; j < sem[i].length; j++){
                if(sem[i][j].modulID===module.id){
                    return [i,j];
                }
            }
        }
        return -1;
    }