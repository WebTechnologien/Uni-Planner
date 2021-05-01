
function onAdd(){
    var newSemester = document.createElement("div");
    newSemester.id=sem.length;
    newSemester.classList.add("semester");
    newSemester.innerHTML= '<h1>'+'Semester '+sem.length+'</h1>';
    console.log(newSemester);
    let semcontainer=document.getElementById("semester-container");
    semcontainer.insertBefore(newSemester,document.getElementById("addSemester"));
    sem.push([]);
    console.log(sem);

    initEventListeners();
}