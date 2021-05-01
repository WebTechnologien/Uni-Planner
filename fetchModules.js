
// ToDo fetch from plan_modul_pos

var sem;

function myFunction(response) {
    //JSON-Response des Servers in Arrays aufteilen -> ein Array für jedes Semester
    const arr = JSON.parse(response);
    sem=[];
    let semesterCount=arr[arr.length-1].listID*1+1;
    for (let i = 0; i < semesterCount; i++){
        sem.push([]);
    }

    for(let i = 0; i < arr.length; i++) {
        sem[arr[i].listID].push(arr[i]);

    }

    for (let i = 0; i<sem.length;i++){
            if (i!==0){
            let semester = document.createElement("div");
            semester.id = i;
            semester.classList.add("semester");
            semester.innerHTML= '<h1>'+'Semester '+i+'</h1>';
            document.getElementById("semester-container").appendChild(semester);
            }

            for (let j = 0; j < sem[i].length; j++) {
                let modul = document.createElement("div");
                modul.id = sem[i][j].modulID;
                if(sem[i][j].semester!=0){
                    modul.classList.add("module-draggable");
                }else{
                    modul.classList.add("module-draggable", "wahlpflichtmodul");
                }
                modul.draggable=true;
                modul.innerHTML='<h1>'+sem[i][j].titel+'</h1>'+'</div>';
                document.getElementById(i).appendChild(modul)
            }
    }
    let addSemester = document.createElement("div")
    addSemester.id = "addSemester";
    addSemester.classList.add("unselectable");
    addSemester.innerHTML='<h1>+</h1>';
    addSemester.addEventListener("click",onAdd)
    document.getElementById("semester-container").appendChild(addSemester);

    let addModul = document.createElement("div");
    addModul.id="addWahlpflichtmodul";
    addModul.classList.add("module-draggable","unselectable");
    addModul.innerHTML='<h1>+</h1>';
    document.getElementById(0).appendChild(addModul);

    initEventListeners();

}

xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        myFunction(this.responseText);
    }
}
xmlhttp.open("GET", "fetchModules.php", true);
xmlhttp.send();