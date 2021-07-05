var sem = [];
var viewMode = true;
var planID;


if (getCookie("planID")) {
    request(getCookie("planID"));
} else {
    request(1);
}

window.onload = function () {
    document.getElementById("plan1").onclick = function () {
        request(1);
    }
    document.getElementById("plan2").onclick = function () {
        request(2);
    }
    document.getElementById("plan3").onclick = function () {
        request(3);
    }
    document.getElementById("clear-button").onclick = function (){
        document.getElementById("search-text").value= "";
        clearHighlight();
    }
    initSearchbar();
};

function request(planid) {
    sem = [];
    planID = planid;
    document.cookie = "planID=" + planID

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("Loading Plan: " + planid);
            initSemArray(this.responseText);
        }
    }
    xmlhttp.open("GET", "fetchModules.php?p=" + planid, true);
    xmlhttp.send();
}

function initSemArray(response) {

    x = response;
    x = x.replaceAll(/\n/g, "<br />").replaceAll(/\r/g, "").replaceAll(/\t/g, "");
    x = x.substr(0, x.indexOf(']') + 1);

    const arr = JSON.parse(x);

    let semesterCount = arr[arr.length - 1].listID * 1 + 1;
    for (let i = 0; i < semesterCount; i++) {
        sem.push([]);
    }

    for (let i = 0; i < arr.length; i++) {
        sem[arr[i].listID].push(arr[i]);

    }

    refreshPlanContainer();

}

function refreshPlanContainer() {

    //create empty semester-container and wahlpflicht-container to refill them from sem-array
    let node = document.getElementById("semester-container");
    let cNode = node.cloneNode(false);
    node.parentNode.replaceChild(cNode, node);

    let node2 = document.getElementById(0);
    let cNode2 = node2.cloneNode(false);
    node2.parentNode.replaceChild(cNode2, node2);

    let lastindex, index = 0;

    while (index < sem.length) {

        if (sem[index].length !== 0) {
            lastindex = index;
        }
        index++;
    }

    //filter empty semesters from array
    sem = sem.filter(function (el, index) {
        return (index <= lastindex || index === 0);
    });

    document.querySelector("h1").innerHTML = "Mein Semesterplan " + planID

    for (let i = 0; i < sem.length; i++) {
        if (i !== 0) {
            let semester = document.createElement("div");
            semester.id = i;
            semester.classList.add("semester");
            let semtitle = document.createElement("h2");
            semtitle.innerHTML= 'Semester ' + i;
            semester.appendChild(semtitle);
            document.getElementById("semester-container").appendChild(semester);
        }

        for (let j = 0; j < sem[i].length; j++) {
            let module = document.createElement("div");
            module.id = sem[i][j].modulID;
            if (parseInt(sem[i][j].Semester) !== 0) {
                module.classList.add("module-draggable");
            } else {
                module.classList.add("module-draggable", "wahlpflichtmodul");
            }
            let modultitle = document.createElement("h3");
            modultitle.innerHTML = sem[i][j].titel;
            module.appendChild(modultitle);

            document.getElementById(i).appendChild(module)

            switch (parseInt(sem[i][j].WiSe)) {
                case 0:
                    initLabel(module, "SoSe", "Sommersemester")
                    break;
                case 1:
                    initLabel(module, "WiSe", "Wintersemester")
                    break;
                case 2:
                    initLabel(module, "WiSe/SoSe", "Winter und Sommersemester")
                    break;
                default:
                    initLabel(module, "kA", "Keine Angabe")
                    break;
            }

            switch (parseInt(module.id.substr(4, 1))) {
                case 1:
                    initLabel(module, "WK", "Wirtschaftsinformatik")
                    break;
                case 2:
                    initLabel(module, "CS", "Informatik-Grundlagen")
                    break;
                case 3:
                    initLabel(module, "BWL", "Wirtschafts-wissenschaften")
                    break;
                case 4:
                    initLabel(module, "QM", "Mathematische Grundlagen")
                    break;
                case 5:
                    initLabel(module, "SK", "Allgemeine Grundlagen")
                    break;
                case 6:
                    initLabel(module, "WPM", "Wahlpflichtmodul")
                    break;
            }

        }
    }

    if (viewMode === true) {
        loadViewMode();
    } else {
        loadEditMode();
    }
}

function initLabel(module, cl, tooltiptext) {
    let label = document.createElement("div");
    label.classList.add("label");
    label.classList.add(cl);
    label.innerHTML = cl
    let tooltip = document.createElement("span");
    tooltip.classList.add("tooltip", "unselectable");
    tooltip.innerHTML = tooltiptext;
    label.appendChild(tooltip);
    module.appendChild(label);
}

function loadViewMode() {
    document.getElementById("saveButton").classList.add("hide");
    document.getElementById("resetButton").classList.add("hide");
    // document.getElementById("cancelButton").classList.add("hide");

    editBtn = document.getElementById("editButton");
    editBtn.classList.remove("hide");

    setModuleDraggable(false);
    setLabelEventlisteners();
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

    let addSemester = document.createElement("div")
    addSemester.id = "addSemester";
    addSemester.classList.add("unselectable");
    addSemester.innerHTML = '<h1>+</h1>';
    addSemester.addEventListener("click", onAddSemester)
    document.getElementById("semester-container").appendChild(addSemester);

    setModuleDraggable(true);
    initEventListeners();

    resetButton = document.getElementById("resetButton");
    resetButton.classList.remove("hide");

    cancelBtn = document.getElementById("cancelButton")
    cancelBtn.classList.remove("hide")

    resetButton.onclick = function () {
        const resetModal = document.getElementById("resetmodal")
        const overlay = document.getElementById("overlay");
        const closeBtn = document.querySelector('#resetmodal .close-button');

        resetModal.classList.add('visible');
        overlay.classList.add('visible');
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        document.body.style.overflow = "hidden";
        document.body.style.height = "100%"

        document.getElementById("modal-cancelButton").onclick = function () {
            closeModal();
        }
        document.getElementById("modal-resetButton").onclick = function () {
            closeModal();
            resetModules(planID);
            location.reload();
        }

        function closeModal() {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
            resetModal.classList.remove('visible');
            overlay.classList.remove('visible');
        }
    }

    cancelBtn.onclick = function () {
        location.reload();
    }

    saveBtn = document.getElementById("saveButton");
    saveBtn.classList.remove("hide");
    saveBtn.onclick = function () {
        viewMode = true;
        saveModules(planID);
        cancelBtn.classList.add("hide")
        addSemester.classList.add("hide")

        document.getElementById("search-text").value = "";
        refreshPlanContainer();

    }
}

function setModuleDraggable(flag) {
    const modules = document.querySelectorAll('.module-draggable');
    modules.forEach(module => {
        module.draggable = flag;
    });
}

function setLabelEventlisteners() {

    const labels = document.querySelectorAll(".label");
    labels.forEach(label => {
        label.addEventListener("click", filterlabel)
    })

    function filterlabel(event) {
        event.stopPropagation();
        if (event.target === this) {
            searchbar = document.getElementById("search-text");
            searchbar.value = "Label is:" + event.target.className.split(" ")[1];
            clearHighlight();
            checkSearchbarValue();
        }
    }
}

function onAddSemester() {
    var newSemester = document.createElement("div");
    newSemester.id = sem.length;
    newSemester.classList.add("semester");
    let semtitle = document.createElement("h2");
    semtitle.innerHTML= 'Semester ' + sem.length;
    newSemester.appendChild(semtitle);

    let semcontainer = document.getElementById("semester-container");
    semcontainer.insertBefore(newSemester, document.getElementById("addSemester"));
    sem.push([]);

    document.documentElement.scrollLeft += 240;
    console.log(document.documentElement.scrollLeft + " " + window.outerWidth + " " + document.body.clientWidth);
    initEventListeners();
}

function saveModules(planID) {

    var reducedArr = JSON.parse(JSON.stringify(sem))
    let keys = ["titel", "titel_long", "Creditpoints", "Semester", "WiSe", "Verantwortung", "Dozent", "Inhalte", "Prüfungsleistung", "Prüfungsvorleistung","Voraussetzungen","Vorraussetzung_fuer"];

    for (let i = 0; i < reducedArr.length; i++) {
        for (let j = 0; j < reducedArr[i].length; j++) {
            for (const key of keys) {
                delete reducedArr[i][j][key];
            }
        }
    }

    let dbParam = JSON.stringify(reducedArr);

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("ServerResponse:" + this.responseText);
        }
    };

    xmlhttp.open("POST", "saveModules.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('semArray=' + dbParam + '&planID=' + planID);

}

function resetModules(planID) {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("ServerResponse:" + this.responseText);
        }
    };

    xmlhttp.open("POST", "reset.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('&planID=' + planID);

}

// https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
function getCookie(c) {
    return (document.cookie.match('(^|; )' + c + '=([^;]*)') || 0)[2]
}


