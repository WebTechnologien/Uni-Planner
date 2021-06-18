
function saveModules(planID){

    var reducedArr = JSON.parse(JSON.stringify(sem))
    let keys = ["titel","titel_long","Creditpoints", "Semester","WiSe", "Verantwortung", "Dozent", "Inhalte", "Prüfungsleistung", "Prüfungsvorleistung"];

    for (let i = 0; i < reducedArr.length; i++) {
        for (let j = 0; j < reducedArr[i].length; j++) {
            for (const key of keys) {
                delete reducedArr[i][j][key];
            }
        }
    }

    let dbParam = JSON.stringify(reducedArr);

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log("ServerResponse:"+this.responseText);
        }
    };

    xmlhttp.open("POST", "saveModules.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('semArray=' + dbParam+ '&planID='+planID);

}