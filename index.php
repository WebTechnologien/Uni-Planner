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
</head>

<body>
<nav class="navbar">
    <div id="logo">
    <img src="img/icons/android-chrome-512x512.png" alt="Logo"></div>
</nav>

<div id="plan-container"></div>

<div id="wahlpflicht-container">
    <h1>Wahlpflicht-Module</h1>
    <div id="0" class="wahlpflicht-flexbox semester-container"></div>
</div>
</body>

<footer><small>&copy; Copyright 2021, Peter Hemmann & Dominic Eckerle</small>

</footer>
</html>