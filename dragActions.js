function initEventListeners() {
    const semContainers = document.querySelectorAll('.semester');
    const modules = document.querySelectorAll('.module-draggable');


    semContainers.forEach(semContainer => {
        semContainer.addEventListener('dragover', onDragOver);
        semContainer.addEventListener('dragenter', onDragEnter);
        semContainer.addEventListener('dragleave', onDragLeave)
        semContainer.addEventListener('drop', onDrop);
    });

    modules.forEach(module => {
        module.addEventListener('dragstart', onDragStart);
        module.addEventListener('dragend', onDragEnd);
    });


    function onDragStart(event) {
        event.dataTransfer.clearData();
        event.dataTransfer.setData('text/plain', event.target.id);
        modules.forEach(module => {
            if (event.currentTarget !== module) {
                module.classList.add('noPointer');
            }
        })

        let module = document.getElementById(event.target.id);
        module.classList.add('dragging')
        if (module.classList.contains("wahlpflichtmodul")) {
            event.dataTransfer.setData('wahlpflichtmodul', '')
        }
        event.currentTarget.classList.add('hide');
    }

    function onDragOver(event) {
        const module = document.querySelector('.dragging')
        let target = event.currentTarget;

        const afterElement = getDragAfterElement(target, event.clientY)
        if (parseInt(event.currentTarget.id) === 0) {
            if (event.dataTransfer.types.includes("wahlpflichtmodul")) {
                event.preventDefault();
                event.currentTarget.classList.add('dragenter');
            }
        } else {

            event.preventDefault();
            if (afterElement == null) {
                target.appendChild(module);
                appendModule(module, target.id)
            } else {
                // console.log(afterElement.id)

                target.insertBefore(module, afterElement);
                moveModule(module, afterElement);
            }
            event.currentTarget.classList.add('dragenter');
        }

    }


    function onDragEnter(event) {
        if (parseInt(event.currentTarget.id) === 0) {
            if (event.dataTransfer.types.includes("wahlpflichtmodul")) {
                event.preventDefault();
            }
        } else {
            event.preventDefault();
        }
    }

    function onDragLeave(event) {
        event.currentTarget.classList.remove('dragenter');
    }

    function onDrop(event) {
        event.preventDefault();
        const moduleID = event.dataTransfer.getData('text');
        const module = document.getElementById(moduleID);
        let target = event.currentTarget;
        const afterElement = getDragAfterElement(target, event.clientY)

        if (parseInt(event.currentTarget.id) === 0) {
            console.log("Target is Wahlpflicht-Area is dragged module a Wahlplichtmodul?:" + module.classList.contains("wahlpflichtmodul"))
            if (module.classList.contains("wahlpflichtmodul")) {
                target.appendChild(module);
                appendModule(module, target.id)
            }
        } else if (module != null) {
            if (afterElement == null) {

            }else{

            }
        }

        event.currentTarget.classList.remove('dragenter');

    }

    function onDragEnd(event) {
        modules.forEach(modules => {
            modules.classList.remove('noPointer');
            modules.classList.remove('dragging');
        })
        event.currentTarget.classList.remove('hide');
    }
}


function appendModule(module, newIndex) {
    let index = getIndexOfModule(module);
    let oldListIndex = index[0];
    let oldPosIndex = index[1];
    console.log(getIndexOfModule(document.getElementById("WK_1108")))
    sem[newIndex].push(sem[oldListIndex][oldPosIndex]);
    sem[oldListIndex].splice(oldPosIndex, 1);
    console.log(getIndexOfModule(document.getElementById("WK_1108")))
}

function moveModule(module, afterElement) {
    let oldindex = getIndexOfModule(module);
    let newIndex = getIndexOfModule(afterElement);

    if (oldindex[0] !== newIndex[0] || oldindex[1] !== newIndex[1]) {
        console.log(sem[oldindex[0]][oldindex[1]].titel+" "+oldindex + " to " + newIndex)

        moduleobj=sem[oldindex[0]][oldindex[1]]
        sem[oldindex[0]].splice(oldindex[1], 1);
        sem[newIndex[0]].splice(newIndex[1], 0, moduleobj)
    }
}

function getIndexOfModule(module) {
    // console.log("searching for: " + module.id);
    for (let i = 0; i < sem.length; i++) {
        for (let j = 0; j < sem[i].length; j++) {
            if (sem[i][j].modulID === module.id) {
                return [i, j];
            }
        }
    }
    return -1;
}

// https://jsfiddle.net/9foLrm7h/2/
function getDragAfterElement(targetContainer, y) {
    const draggable = [...targetContainer.querySelectorAll('.module-draggable')]

    return draggable.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}