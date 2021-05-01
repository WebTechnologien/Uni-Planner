
function onAdd(){
    var newSemester = document.createElement("div");
    newSemester.id=sem.length;
    newSemester.classList.add("semester");
    newSemester.innerHTML= '<h1>'+'Semester '+sem.length+'</h1>';

    let semcontainer=document.getElementById("semester-container");
    semcontainer.insertBefore(newSemester,document.getElementById("addSemester"));
    sem.push([]);

    document.body.scrollLeft+=101;
    console.log(document.body.scrollLeft+" "+window.outerWidth+""+document.body.clientWidth);
    initEventListeners();
}