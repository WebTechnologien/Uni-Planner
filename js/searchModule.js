function initSearchbar() {
    const searchText = document.getElementById('search-text');
    searchText.addEventListener('keyup', onKeyUp);

    function onKeyUp(event) {

        clearHighlight();
        checkSearchbarValue();
    }
}

function clearHighlight(){
    for (let i = 0; i < sem.length; i++) {
        for (let j = 0; j < sem[i].length; j++) {
            const element = document.getElementById(sem[i][j].modulID);
            element.classList.remove("highlighted");
            element.classList.remove("notHighlighted");
            element.classList.remove("noElevation")
            document.getElementById("overlay").classList.remove('visible');
        }
    }
}

function checkSearchbarValue(){
    const searchContent = document.getElementById("search-text").value;
    for (let i = 0; i < sem.length; i++) {
        for (let j = 0; j < sem[i].length; j++) {
            const element2 = document.getElementById(sem[i][j].modulID);
            if(searchContent.trim().length>2 &&(sem[i][j].titel.trim().toLowerCase().includes(searchContent.toLowerCase()))
                || searchContent.trim().length>2&&(sem[i][j].modulID.trim().toLowerCase().replace("_","").includes(searchContent.toLowerCase().replace("_","")))){

                element2.classList.add("highlighted");

                const overlay = document.getElementById("overlay");
                overlay.classList.add('visible');
                overlay.onclick = function (){
                    overlay.classList.remove('visible');
                    document.querySelectorAll(".highlighted").forEach(el=>{
                        el.classList.add("noElevation")
                    })
                }

            }else if (searchContent.trim().length>2&&!(searchContent.startsWith("Label is:"))){
                element2.classList.add("notHighlighted");
            }else{
                overlay.classList.remove('visible');
            }

        }
    }

    if (searchContent.startsWith("Label is:")) {

        let filter = searchContent.split(':')[1];
        modules = document.getElementsByClassName("module-draggable")

        if(filter.startsWith("WiSe/SoSe")){
            filter="WiSe\\/SoSe";
        }

        for (var i = 0; i < modules.length; i++) {
            children = modules[i].querySelectorAll("." + filter);
            if (children.length > 0) {
                modules[i].classList.add("highlighted")
                document.querySelectorAll(".highlighted").forEach(el=>{
                    el.classList.add("noElevation")
                })
            }else{
                modules[i].classList.add("notHighlighted");
            }

        }
    }
}
