<?php
session_start();
$_SESSION["login"] = 0;
$table_usernames = null;
$table_passwords = null;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("localhost", "root", "", "uni-planner");
    if ($conn->connect_error) {
        die("Connection failed" . $conn->connect_error);
    }
    mysqli_select_db($conn, "uni-planner") or due ("Cannot connect to database");
    $query = mysqli_query($conn, "Select * from user");
    while($row = mysqli_fetch_array($query)) {
        $table_usernames = $row['username'];
        $table_passwords = $row['pwd'];
        if ($_POST["loginname"] == $table_usernames && $_POST["loginpasswort"] == $table_passwords) {
            $_SESSION["login"] = 1;
        }
    }
    if ($_SESSION["login"] != 1) {
        print '<script>alert("Falscher Benutzname oder Passwort!");</script>';
        include("login.php");
        exit;
    }
}
if ($_SESSION["login"] != 1)
{
    include("login.php");
    exit;
}
?>

<html lang="de">
<head>
    <Title>Uni-Planner</Title>

    <link rel="shortcut icon" type="image/x-icon" href="img/icons/android-chrome-512x512.png">
    <link rel="stylesheet" href="main.css">
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
</nav>

<div id="plan-container">
    <div id="semester-header" class="headerSemester">
        <h1>Semester&uumlbersicht</h1>
        <svg xmlns="http://www.w3.org/2000/svg"
             id="editButton"
             class="EditButton unselectable"
             width="114"
             height="39"
             viewBox="0 0 114 39">

            <path d="M.5,0H108a6,6,0,0,1,6,6V37.5a.5.5,0,0,1-.5.5H.5a.5.5,0,0,1-.5-.5V.5A.5.5,0,0,1,.5,0Z"
                  fill="#31827e"/>
            <text transform="translate(27.0146 23.7329)" font-size="17" fill="#fff"
                  font-family="MicrosoftSansSerif, Microsoft Sans Serif">Bearbeiten
            </text>
            <path d="M16.91,17.3043l-8.29,8.29H4.4749V21.4492l8.29-8.29L16.91,17.3043ZM9.1379,23.5216,6.8064,21.19,5.77,21.9673v1.0362H7.0654v1.2953H8.1016l1.0363-.7772Zm3.8858-8.5487h0l-5.44,5.44h0c0,.259,0,.259.2591.259h0l5.44-5.44h0c0-.259,0-.259-.259-.259Zm6.2172.259-1.8133,1.5543-4.1449-4.1448,1.8134-1.5543c.259-.2591.5181-.5181.7772-.5181a1.9639,1.9639,0,0,1,1.0362.5181l2.3314,2.3314c0,.2591.2591.5182.2591.7772s-.2591.7772-.2591,1.0362Z"
                  fill="#fff" fill-rule="evenodd"/>

        </svg>
        <svg xmlns="http://www.w3.org/2000/svg"
             id="saveButton"
             class="SaveButton hide unselectable"
             width="114"
             height="39"
             viewBox="0 0 114 39">
            <path d="M.5,0H108a6,6,0,0,1,6,6V37.5a.5.5,0,0,1-.5.5H.5a.5.5,0,0,1-.5-.5V.5A.5.5,0,0,1,.5,0Z"
                  fill="#31827e"/>
            <text transform="translate(27.0146 23.7329)" font-size="17" fill="#fff"
                  font-family="MicrosoftSansSerif, Microsoft Sans Serif">Speichern
            </text>
            <path d="M19.8227,25.1246a.7.7,0,0,1-.7239.73H5.1045a.7.7,0,0,1-.7239-.73V11.494a.7.7,0,0,1,.7239-.73H7.276v5.8417a1.4234,1.4234,0,0,0,1.3874,1.46h6.394a1.4234,1.4234,0,0,0,1.3873-1.46V10.7638h.4826a.547.547,0,0,1,.4826.2434l2.1715,2.1906a.555.555,0,0,1,.2413.4868v11.44Zm-4.1018-8.5191a.7.7,0,0,1-.7239.73H8.7237A.7.7,0,0,1,8,16.6055V10.7638h7.721v5.8417Zm-1.4477-4.8681H12.1017v4.6247h2.1715V11.7374Z"
                  fill="#fff" fill-rule="evenodd"/>

        </svg>

    </div>

    <div id="semester-container"></div>

    <div id="modal" class="modal" >
        <div id="modal-header" class="modal-header">
            <div class="title">&Uumlberschrift</div>
            <button class="close-button">&times;</button>
        </div>
        <div id="modal-body" class="modal-body"></div>
    </div>
    <div id="overlay"></div>

    <div id="wahlpflicht-header">
        <h1>Wahlpflicht-Module</h1>
    </div>
    <div id="0" class="wahlpflicht-container semester"></div>
</div>


</body>

<footer><small>&copy; Copyright 2021, Peter Hemmann & Dominic Eckerle</small><br><br>
    <small>Special thanks to Nico and HR</small>

</footer>
</html>