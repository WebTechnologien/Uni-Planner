<?php
session_start();
if (!($_SESSION["username"])) {
    header("Location:login.php");
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <Title>Uni-Planner</Title>
    <link rel="shortcut icon" type="image/x-icon" href="images/logo.png">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/modal.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/buttons.css">
    <script src="js/main.js"></script>
    <script src="js/dragActions.js"></script>
    <script src="js/infoModal.js"></script>
    <script src="js/searchModule.js"></script>
</head>

<body>
<nav class="navbar">

    <div id="logo">
        <img src="images/logo.png" alt="Logo">
    </div>

    <div class="search-box">
        <input id="search-text" class="search-text" type="text" placeholder="Suche...">
        <div class="line"></div>
        <button id="clear-button" class="clear-button" ></button>
    </div>

    <div class="dropdown">
        <button class="dropbtn"><?php echo $_SESSION["username"]; ?> </button>
        <div class="dropdown-content">
            <div id="plan_div">
                <a id="plan1" class="planButton">Plan 1</a>
                <a id="plan2" class="planButton">Plan 2</a>
                <a id="plan3" class="planButton">Plan 3</a>
            </div>
            <div id="logout_div">
                <a id="logout" href="logout.php">Logout</a>
            </div>
        </div>
    </div>

</nav>

<div id="plan-container">
    <div id="semester-header" class="headerSemester">

        <button id=resetButton class="button left-button hide"><img src="images/reset.png" alt=" "> Zur&uuml;cksetzen
        </button>
        <h1>Semester&uuml;bersicht</h1>
        <button id=cancelButton class="button cancel-button hide"><img src="images/cancel.png" alt=" "> Abbrechen
        </button>
        <button id=saveButton class="button right-button"><img src="images/save.png" alt=" "> Speichern</button>
        <button id=editButton class="button right-button"><img src="images/edit.png" alt=" "> Bearbeiten</button>

    </div>
    <div id="semester-container"></div>

    <div id="wahlpflicht-header">
        <h1>Wahlpflicht-Module</h1>
    </div>
    <div id="0" class="wahlpflicht-container semester">
        <div id="addSemester" class="unselectable"><h1>+</h1></div>

    </div>


    <div id="modal" class="modal">
        <div id="modal-header" class="modal-header">
            <div class="title">&Uuml;berschrift</div>
            <button class="close-button">&times;</button>
        </div>
        <div id="modal-body" class="modal-body"></div>
    </div>

    <div id="resetmodal" class="modal warning-modal">
        <div id="modal-header" class="modal-header">
            <div class="title">Warnung!</div>
            <button class="close-button">&times;</button>
        </div>
        <div id="modal-body" class="modal-body">
            <p>Möchtest du deinen Semesterplan wirklich auf die Standardwerte zur&uuml;cksetzen?<br>Diese Aktion kann
                nicht r&uuml;ckg&auml;ngig gemacht werden!</p>
            <button id=modal-cancelButton class="button "><img src="images/cancel_white.png" alt=" "> Abbrechen
            </button>
            <button id=modal-resetButton class="button "><img src="images/reset.png" alt=" "> Zur&uuml;cksetzen
            </button>
        </div>
    </div>

    <div id="reqmodal" class="modal warning-modal">
        <div id="modal-header" class="modal-header">
            <div class="title">Warnung!</div>
            <button class="close-button">&times;</button>
        </div>
        <div id="modal-body" class="modal-body">
            <p id="reqtext"></p>
            <button id=modal-revertButton class="button ">R&uuml;ckg&auml;ngig machen</button>
            <button id=modal-okButton class="button ">OK</button>
        </div>
    </div>


    <div id="overlay"></div>

</div>


</body>

<footer><small>&copy; Copyright 2021, Peter Hemmann & Dominic Eckerle</small><br><br>
</footer>
</html>