window.onload = function() {
    const searchText = document.getElementById('search-text');
    console.log(searchText);
    searchText.addEventListener('keyup', onKeyUp);

    function onKeyUp(event) {
        for (let i = 0; i < sem.length; i++) {
            for (let j = 0; j < sem[i].length; j++) {
                const element1 = document.getElementById(sem[i][j].modulID);
                element1.classList.remove("highlighted");
            }
        }
        const searchContent = event.target.value;
        for (let i = 0; i < sem.length; i++) {
            for (let j = 0; j < sem[i].length; j++) {
                if (searchContent.localeCompare(sem[i][j].titel.trim()) === 0) {
                    const element2 = document.getElementById(sem[i][j].modulID);
                    element2.classList.add("highlighted");
                }
            }
        }
    }
}