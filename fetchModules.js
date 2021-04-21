
// ToDo fetch from plan_modul_pos

var sem;

function myFunction(response) {
    //JSON-Response des Servers in Arrays aufteilen -> ein Array für jedes Semester
    const arr = JSON.parse(response);
    sem=[[],[],[],[],[],[],[],[]];


    for(let i = 0; i < arr.length; i++) {
        switch (parseInt(arr[i].listID)){
            case 1:
                sem[1].push(arr[i]);
                break;
            case 2:
                sem[2].push(arr[i]);
                break;
            case 3:
                sem[3].push(arr[i]);
                break;
            case 4:
                sem[4].push(arr[i]);
                break;
            case 5:
                sem[5].push(arr[i]);
                break;
            case 6:
                sem[6].push(arr[i]);
                break;
            case 7:
                sem[7].push(arr[i]);
                break;
            case 0:
                sem[0].push(arr[i])
        }
    }
    console.log(sem);
    //Dynamischen HTML-Code zusammenbauen
    let html = '';
    for(let i = 1; i < sem.length; i++){
        html+='<div id=' +i+' ';
        html+='class="semester-container">'+'Semester '+i;
        for(let j = 0; j < sem[i].length; j++){
            html+='<div id="'+sem[i][j].modulID+"\"";
            html+='class="module-draggable" draggable="true">';
            html+='<h1>'+sem[i][j].titel+'</h1>'+'</div>';
        }
        html+='</div>';
    }
    document.querySelector('#plan-container').innerHTML=html;

    let html2 = '';
        for(let i = 0; i < sem[0].length; i++){
            html2+='<div id="'+sem[0][i].modulID+"\"";
            html2+='class="module-draggable wahlpflichtmodul" draggable="true">';
            html2+='<h1>'+sem[0][i].titel+'</h1>'+'</div>';
        }
    document.querySelector('.wahlpflicht-flexbox').innerHTML=html2;

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