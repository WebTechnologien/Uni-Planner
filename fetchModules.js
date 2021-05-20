var sem = [];
var viewMode;
var planID;

//default request
request(1);
const default_loaded=true;

function request(planid) {
    sem=[];
    planID=planid;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("Loading Plan: "+planid);
            initSemArray(this.responseText);
        }
    }
    xmlhttp.open("GET", "fetchModules.php?p="+planid, true);
    xmlhttp.send();
}

window.onload = function(){
    document.getElementById("plan1").onclick = function (){
        request(1);
    }
    document.getElementById("plan2").onclick = function (){
        request(2);
    }
    document.getElementById("plan3").onclick = function (){
        request(3);
    }
};

function initSemArray(response) {
    console.log(response);
    x = response;
    x = x.replaceAll(/\n/g, "<br />").replaceAll(/\r/g, "").replaceAll(/\t/g, "").replaceAll("Inhalte<br />","");
    x = x.substr(0, x.indexOf(']')+1)

    const arr = JSON.parse(x);

    let semesterCount = arr[arr.length - 1].listID * 1 + 1;
    for (let i = 0; i < semesterCount; i++) {
        sem.push([]);
    }

    for (let i = 0; i < arr.length; i++) {
        sem[arr[i].listID].push(arr[i]);

    }
    console.log(sem)
    viewMode = true
    refreshPlanContainer()

}

function refreshPlanContainer() {

    if (default_loaded) {
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
            if (parseInt(sem[i][j].semester) !== 0) {
                module.classList.add("module-draggable");
            } else {
                module.classList.add("module-draggable", "wahlpflichtmodul");
            }
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
    editBtn = document.getElementById("editButton");
    editBtn.classList.remove("hide");
    setModuleDraggable(false);
    handleModuleModal();
    editBtn.onclick = function () {
        viewMode = false;

        //clone plan-container to remove EventListeners
        let el = document.getElementById("plan-container");
        let elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        loadEditMode();
    }
}

function loadEditMode() {
    document.getElementById("editButton").classList.add("hide");
    saveBtn = document.getElementById("saveButton");
    saveBtn.classList.remove("hide");

    let addSemester = document.createElement("div")
    addSemester.id = "addSemester";
    addSemester.classList.add("unselectable");
    addSemester.innerHTML = '<h1>+</h1>';
    addSemester.addEventListener("click", onAdd)
    document.getElementById("semester-container").appendChild(addSemester);
    refreshAddModuleButton();
    setModuleDraggable(true);
    initEventListeners();

    saveBtn.onclick = function () {
        viewMode = true;
        saveModules(planID);
        addSemester.remove()

        //clone plan-container to remove EventListeners


        refreshPlanContainer(false);

    }
}

function setModuleDraggable(flag) {
    const modules = document.querySelectorAll('.module-draggable');
    modules.forEach(module => {
        module.draggable = flag;
    });
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


