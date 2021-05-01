

var sem;
var viewMode;
function myFunction(response) {
    //JSON-Response des Servers in Arrays aufteilen -> ein Array für jedes Semester
    const arr = JSON.parse(response);
    sem = [];
    let semesterCount = arr[arr.length - 1].listID * 1 + 1;
    for (let i = 0; i < semesterCount; i++) {
        sem.push([]);
    }

    for (let i = 0; i < arr.length; i++) {
        sem[arr[i].listID].push(arr[i]);

    }
    viewMode = 1
    refreshPlanContainer(true)
}
function refreshPlanContainer(firstcall){

    if (!firstcall) {
        let node = document.getElementById("semester-container");
        let cNode = node.cloneNode(false);
        node.parentNode.replaceChild(cNode, node);

        let node2 = document.getElementById(0);
        let cNode2 = node2.cloneNode(false);
        node2.parentNode.replaceChild(cNode2, node2);
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
            let modul = document.createElement("div");
            modul.id = sem[i][j].modulID;
            if (sem[i][j].semester != 0) {
                modul.classList.add("module-draggable");
            } else {
                modul.classList.add("module-draggable", "wahlpflichtmodul");
            }
            modul.draggable = true;
            modul.innerHTML = '<h1>' + sem[i][j].titel + '</h1>' + '</div>';
            document.getElementById(i).appendChild(modul)
        }
    }


    if (viewMode === 0) {
        loadEditMode();
    }else{
        loadViewMode();
    }
}

function loadViewMode(){
    document.getElementById("saveButton").classList.add("hide");

    let editBtn=document.getElementById("editButton");
    editBtn.classList.remove("hide");

    editBtn.onclick = function (){
        viewMode=0;
        loadEditMode();

    }
}

function loadEditMode(){
    let addSemester = document.createElement("div")
    addSemester.id = "addSemester";
    addSemester.classList.add("unselectable");
    addSemester.innerHTML = '<h1>+</h1>';
    addSemester.addEventListener("click", onAdd)
    document.getElementById("semester-container").appendChild(addSemester);

    let addModul = document.createElement("div");
    addModul.id = "addWahlpflichtmodul";
    addModul.classList.add("module-draggable", "unselectable");
    addModul.innerHTML = '<h1>+</h1>';
    document.getElementById(0).appendChild(addModul);
    document.querySelector(".EditButton").classList.add("hide");

    let saveBtn=document.getElementById("saveButton");
    saveBtn.classList.remove("hide");
    initEventListeners();

    saveBtn.onclick = function (){
        viewMode=1;
        addSemester.remove()
        addModul.remove();
        var el = document.getElementById("plan-container");
        elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone,el);

        refreshPlanContainer(false);
        loadViewMode()
    }


}

xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        myFunction(this.responseText);
    }
}
xmlhttp.open("GET", "fetchModules.php", true);
xmlhttp.send();