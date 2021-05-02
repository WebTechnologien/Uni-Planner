var sem;
var viewMode;

function myFunction(response) {

    const arr = JSON.parse(response);
    sem = [];
    let semesterCount = arr[arr.length - 1].listID * 1 + 1;
    for (let i = 0; i < semesterCount; i++) {
        sem.push([]);
    }

    for (let i = 0; i < arr.length; i++) {
        sem[arr[i].listID].push(arr[i]);

    }
    viewMode = true
    refreshPlanContainer(true)
}

function refreshPlanContainer(firstcall) {

    if (!firstcall) {
        //create empty semester and wahlpflicht container to refill them from sem-array
        let node = document.getElementById("semester-container");
        let cNode = node.cloneNode(false);
        node.parentNode.replaceChild(cNode, node);

        let node2 = document.getElementById(0);
        let cNode2 = node2.cloneNode(false);
        node2.parentNode.replaceChild(cNode2, node2);

        //filter empty semesters from array
        sem = sem.filter(function (el) {
            return el.length !== 0;
        });
    }
    for (let i = 0; i < sem.length; i++) {
        if (i !== 0) {
            let semester = document.createElement("div");
            semester.id = i;
            semester.classList.add("semester");
            semester.innerHTML = '<h1>' + 'Semester ' + i + '</h1>';
            document.getElementById("semester-container").appendChild(semester);
        }

        for (let j = 0; j < sem[i].length; j++) {
            let module = document.createElement("div");
            module.id = sem[i][j].modulID;
            if (sem[i][j].semester != 0) {
                module.classList.add("module-draggable");
            } else {
                module.classList.add("module-draggable", "wahlpflichtmodul");
            }
            module.draggable = true;
            module.innerHTML = '<h1>' + sem[i][j].titel + '</h1>' + '</div>';
            document.getElementById(i).appendChild(module)
        }
    }

    if (viewMode === true) {
        loadViewMode();
    } else {
        loadEditMode();
    }
}

function loadViewMode() {
    document.getElementById("saveButton").classList.add("hide");

    let editBtn = document.getElementById("editButton");
    editBtn.classList.remove("hide");

    editBtn.onclick = function () {
        viewMode = false;
        document.querySelector(".EditButton").classList.add("hide");
        loadEditMode();
    }
}

function loadEditMode() {
    let addSemester = document.createElement("div")
    addSemester.id = "addSemester";
    addSemester.classList.add("unselectable");
    addSemester.innerHTML = '<h1>+</h1>';
    addSemester.addEventListener("click", onAdd)
    document.getElementById("semester-container").appendChild(addSemester);
    refreshAddModuleButton();

    let saveBtn = document.getElementById("saveButton");
    saveBtn.classList.remove("hide");
    initEventListeners();

    saveBtn.onclick = function () {
        viewMode = true;
        addSemester.remove()
        addModule.remove();

        //clone plan-container to remove EventListener
        let el = document.getElementById("plan-container");
        let elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        refreshPlanContainer(false);
        loadViewMode()
    }


}

function refreshAddModuleButton() {
    if (document.getElementById("addWahlpflichtmodul") != null) {
        document.getElementById("addWahlpflichtmodul").remove();
    }
    let addModule = document.createElement("div");
    addModule.id = "addWahlpflichtmodul";
    addModule.classList.add("module-draggable", "unselectable");
    addModule.innerHTML = '<h1>+</h1>';
    document.getElementById(0).appendChild(addModule);
}

xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        myFunction(this.responseText);
    }
}
xmlhttp.open("GET", "fetchModules.php", true);
xmlhttp.send();