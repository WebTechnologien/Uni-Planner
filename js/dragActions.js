let originIndex;

function initDragDropEventListeners() {
    const semesters = document.querySelectorAll('.semester');
    const modules = document.querySelectorAll('.module-draggable');

    semesters.forEach(semContainer => {
        semContainer.addEventListener('dragover', onDragOver);
        semContainer.addEventListener('dragleave', onDragLeave)
        semContainer.addEventListener('drop', onDrop);
    });

    modules.forEach(module => {
        module.addEventListener('dragstart', onDragStart);
        module.addEventListener('dragend', onDragEnd);
    });


    function onDragStart(event) {
        event.currentTarget.classList.add('dragging','hide')

        event.dataTransfer.clearData();
        event.dataTransfer.setData('text/plain', event.target.id);

        modules.forEach(module => {
            if (event.currentTarget !== module) {
                module.classList.add('noPointer');
            }
        })

        originIndex = getIndexOfModule(event.target.id);

    }

    function onDragOver(event) {
        const module = document.querySelector('.dragging')
        let semester = event.currentTarget;

        if (parseInt(event.currentTarget.id) === 0) {
            if (module.classList.contains("wahlpflichtmodul")) {
                event.preventDefault();
                event.currentTarget.classList.add('dragenter');
                semester.appendChild(module);
                appendModule(module, semester.id);
            }
        } else if (semester.childNodes.length === 0) {
            event.preventDefault();
            semester.appendChild(module);
            appendModule(module, semester.id);
        } else {
            event.preventDefault();
            event.currentTarget.classList.add('dragenter');
            const afterElement = getDragAfterElement(semester, event.clientY)
            if (afterElement == null) {
                semester.appendChild(module);
                appendModule(module, semester.id)
            } else {
                semester.insertBefore(module, afterElement);
                moveModule(module, afterElement);
            }
        }
    }

    function onDragLeave(event) {
        event.currentTarget.classList.remove('dragenter');
    }

    function onDrop(event) {
        event.currentTarget.classList.remove('dragenter');
        const module = event.dataTransfer.getData('text');
        checkRequirements(getIndexOfModule(module));
    }

    function onDragEnd(event) {
        event.currentTarget.classList.remove('hide','dragging');
        modules.forEach(modules => {
            modules.classList.remove('noPointer');
        })
    }
}

function appendModule(module, newIndex) {
    let index = getIndexOfModule(module.id);
    let oldListIndex = index[0];
    let oldPosIndex = index[1];

    sem[newIndex].push(sem[oldListIndex][oldPosIndex]);
    sem[oldListIndex].splice(oldPosIndex, 1);
}

function moveModule(module, afterElement) {
    let oldindex = getIndexOfModule(module.id);
    let newIndex = getIndexOfModule(afterElement.id);

    if (oldindex[0] !== newIndex[0] || oldindex[1] !== newIndex[1]) {

        moduleobj = sem[oldindex[0]][oldindex[1]];
        sem[oldindex[0]].splice(oldindex[1], 1);
        sem[newIndex[0]].splice(newIndex[1], 0, moduleobj);
    }
}

function getIndexOfModule(moduleID) {
    for (let i = 0; i < sem.length; i++) {
        for (let j = 0; j < sem[i].length; j++) {
            if (sem[i][j].modulID === moduleID) {
                return [i, j];
            }
        }
    }
    return -1;
}

function checkRequirements(index) {

    const requirements = sem[index[0]][index[1]].Voraussetzungen.split("(").slice(1);
    let text = "";
    for (const requirementsElement of requirements) {
        r_index = getIndexOfModule(requirementsElement.substr(0, requirementsElement.indexOf(")")));
        if (r_index[0] >= index[0] && index[0] !== 0) {
            text += "Für das Modul \"" + sem[index[0]][index[1]].titel.trim() + "\" wird \"" + sem[r_index[0]][r_index[1]].titel + "\" vorrausgesetzt!<br>";
        }
    }

    const requiredFor = sem[index[0]][index[1]].Vorraussetzung_fuer.split(",")
    for (const requiredForElement of requiredFor) {
        r2_index = getIndexOfModule(requiredForElement);
        if (r2_index[0] <= index[0]) {
            text += "Für das Modul \"" + sem[r2_index[0]][r2_index[1]].titel + "\" wird \"" + sem[index[0]][index[1]].titel.trim() + "\" vorrausgesetzt!<br>";
        }
    }
    if (text.length > 0) {
        initModal(document.getElementById("reqmodal"));
        document.getElementById("reqtext").innerHTML = text;
        document.getElementById("modal-okButton").onclick = function () {
            closeModal();
        }

        document.getElementById("modal-revertButton").onclick = function () {
            module = document.getElementById(sem[index[0]][index[1]].modulID);
            document.getElementById(originIndex[0]).appendChild(module);
            appendModule(module, originIndex[0]);
            closeModal();
        }
    }
}

//-----function entnommen aus: https://jsfiddle.net/9foLrm7h/2/ -----
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
//-------------------------------------------------------------------