
function initEventListeners(){

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
    });
}

var counter=0;
function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDragEnter(event){
    event.preventDefault();
    event.currentTarget.classList.add('dragenter');
    counter++;
    console.log(event.currentTarget.innerText.split("\n")[0]+" entered")
}

function onDragLeave(event){
    counter--;
    if(counter===0){
        event.currentTarget.classList.remove('dragenter');
    }
    console.log(counter);
    console.log(event.currentTarget.innerText.split("\n")[0]+" left");
}

function onDrop(event) {
    const moduleID = event.dataTransfer.getData('text');
    const module = document.getElementById(moduleID);
    let target = event.currentTarget;
    target.classList.remove('dragenter');
    target.appendChild(module);
    counter=0;
    event.dataTransfer.clearData();
}