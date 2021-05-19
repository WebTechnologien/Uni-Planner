<?php
session_start();
$message = "";

if (count($_POST)>0) {
    $conn = new mysqli("localhost", "root", "", "uni-planner");
    if ($conn->connect_error) {
        die("Connection failed" . $conn->connect_error);
    }
    mysqli_select_db($conn, "uni-planner") or die ("Cannot connect to database");
    $query = mysqli_query($conn, "Select * from user where username='" . $_POST["loginname"] . "' and pwd='" . $_POST["loginpasswort"] . "'");
    $row = mysqli_fetch_array($query);
    if (is_array($row)) {
        $_SESSION["uid"] = $row['uid'];
        $_SESSION["username"] = $row['username'];
    } else {
        $message = "Falscher Benutzname oder Passwort!";
    }
    if (isset($_SESSION["uid"])) {
        header("Location:index.php");
    }
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>UniPlaner Login</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
<div>
    <div id="left_div">
        <p id="login_text">Login</p>
        <div id="box_login">
            <form method="post" action="">
                Username:
                <br>
                <input id="username_textfield" name="loginname">
                Passwort:
                <br>
                <input id="password_textfield" name="loginpasswort" type=password>
                <br>
                <input id="button_login" type=submit name=submit value="Login">
                <div class="message"><?php if($message!="") { echo $message; } ?></div>
            </form>
            Noch keinen Account?
            <br>
            <button id="button_register" onclick="document.location='register.php'">Registrieren</button>
        </div>
    </div>
    <div id="right_div">
        <div id="text_div">
            Keep <img id="logo" src="img/icons/android-chrome-512x512.png" alt="Logo"> the good work
        </div>
    </div>
</div>
</body>
<footer><small>&copy; Copyright 2021, Peter Hemmann & Dominic Eckerle</small></footer>
</html>