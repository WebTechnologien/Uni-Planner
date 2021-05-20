//ToDo saving Modules to modul_plan_pos


function saveModules(planID){

    let dbParam = JSON.stringify(sem);
    dbParam = dbParam.replace(/[<]br[^>]*[>]/gi,"");

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