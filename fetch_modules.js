
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            myFunction(this.responseText);
        }
    }
    xmlhttp.open("GET", "fetch_modules.php", true);
    xmlhttp.send();

    function myFunction(response) {
        //JSON-Response des Servers in Arrays aufteilen -> ein Array für jedes Semester
        var arr = JSON.parse(response);
        var sem=[[],[],[],[],[],[],[]];

        //Unbenutztes Array für Wahlpflicht Module
        var wpf=[];

        for(i = 0; i < arr.length; i++) {
            switch (parseInt(arr[i].Semester)){
                case 1:
                    sem[0].push(arr[i]);
                    break;
                case 2:
                    sem[1].push(arr[i]);
                    break;
                case 3:
                    sem[2].push(arr[i]);
                    break;
                case 4:
                    sem[3].push(arr[i]);
                    break;
                case 5:
                    sem[4].push(arr[i]);
                    break;
                case 6:
                    sem[5].push(arr[i]);
                    break;
                case 7:
                    sem[6].push(arr[i]);
                    break;
                case 0:
                    wpf.push(arr[i])
            }
        }

        //Dynamischen HTML-Code zusammenbauen
        html='';
            for(i = 0; i < sem.length; i++){
                html+='<div class="semester-container">'+'Semester '+(i+1);
                for(j = 0; j < sem[i].length; j++){
                    html+='<div id="'+sem[i][j].Kuerzel+"\"";
                    html+='class="module-draggable" draggable="true">';
                    html+='<h1>'+sem[i][j].Titel+'</h1>'+'</div>';
                }
                html+='</div>';
            }
            document.querySelector('#plan-container').innerHTML=html;
       initEventListeners();
    }