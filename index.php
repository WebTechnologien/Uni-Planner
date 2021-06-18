<?php
session_start();
if(!($_SESSION["username"])) {
    header("Location:login.php");
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <Title>Uni-Planner</Title>
    <link rel="shortcut icon" type="image/x-icon" href="img/icons/android-chrome-512x512.png">
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="modal.css">
    <script src="fetchModules.js"></script>
    <script src="dragActions.js"></script>
    <script src="saveModules.js"></script>
    <script src="addSemester.js"></script>
    <script src="modal.js"></script>
</head>

<body>
<nav class="navbar">
    <div id="logo">
        <img src="img/icons/android-chrome-512x512.png" alt="Logo"></div>

    <div class="dropdown">
        <button class="dropbtn"><?php echo $_SESSION["username"];?>  </button>
        <div class="dropdown-content">
            <div id="plan_div">
                <a id="plan1">Plan 1</a>
                <a id="plan2">Plan 2</a>
                <a id="plan3">Plan 3</a>
            </div>
            <div id="logout_div">
                <a id="logout" href="logout.php">Logout</a>
            </div>
        </div>
    </div>
</nav>

<div id="plan-container">
    <div id="semester-header" class="headerSemester">

        <button id=resetButton class="left-button hide"><img src="img/icons/reset.png" alt=" "> Zur&uuml;cksetzen</button>
        <h1>Semester&uuml;bersicht</h1>
        <button id=saveButton  class="right-button"><img src="img/icons/save.png" alt=" "> Speichern</button>
        <button id=editButton class="right-button"><img src="img/icons/edit.png" alt=" "> Bearbeiten</button>

    </div>
    <div id="semester-container"></div>

    <div id="wahlpflicht-header">
        <h1>Wahlpflicht-Module</h1>
    </div>
    <div id="0" class="wahlpflicht-container semester"></div>


    <div id="modal" class="modal" >
        <div id="modal-header" class="modal-header">
            <div class="title">&Uuml;berschrift</div>
            <button class="close-button">&times;</button>
        </div>
        <div id="modal-body" class="modal-body"></div>
    </div>

    <div id="overlay"></div>

</div>


</body>

<footer><small>&copy; Copyright 2021, Peter Hemmann & Dominic Eckerle</small><br><br>
    <small>Special thanks to Nico and HR</small>

</footer>
</html>