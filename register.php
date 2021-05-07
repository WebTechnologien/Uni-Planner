<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>UniPlaner Registrierung</title>
    <link rel="stylesheet" href="register.css">
</head>
<body>
<div>
    <div id="left_div">
        <div id="text_div">
            Keep <img id="logo" src="img/icons/android-chrome-512x512.png" alt="Logo"> the good work
        </div>
    </div>
    <div id="right_div">
        <p id="register_text">Registrierung</p>
        <div id="box_register">
            <form action="register.php" method="POST">
                Benutzername:
                <br>
                <input id="username_textfield" type="text" name="registername" required="required">
                Passwort:
                <br>
                <input id="password1_textfield" type=password name="registerpasswort" required="required">
                <br>
                Passwort wiederholen:
                <br>
                <input id="password2_textfield" type=password name="registerpasswort2" required="required">
                <br>
                <input id="button_register" type="submit" value="Registrieren"/>
            </form>
            Bereits registriert?
            <br>
            <button id="button_login" onclick="document.location='login.php'">Einloggen</button>
        </div>
    </div>
</div>
</body>
<footer><small>&copy; Copyright 2021, Peter Hemmann & Dominic Eckerle</small></footer>
</html>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("localhost", "root", "", "uni-planner");
    if ($conn->connect_error) {
        die("Connection failed" . $conn->connect_error);
    }
    $username = mysqli_real_escape_string($conn, $_POST['registername']);
    $password = mysqli_real_escape_string($conn, $_POST['registerpasswort']);
    $password2 = mysqli_real_escape_string($conn, $_POST['registerpasswort2']);
    $bool = true;
    $table_users = null;

    if ($password == $password2) {
        mysqli_select_db($conn, "uni-planner") or due("Cannot connect to database");
        $query = mysqli_query($conn, "Select * from user");
        while ($row = mysqli_fetch_array($query)) {
            $table_users = $row['username'];
            if ($username == $table_users) {
                $bool = false;
                print '<script>alert("Benutzername bereits vergeben!");</script>';
                print '<script>window.location.assign("register.php");</script>';
            }
        }
        if ($bool) {
            mysqli_query($conn, "INSERT INTO user (username, pwd)
                                VALUES ('$username', '$password')");
            print '<script>alert("Erfolgreich registriert!");</script>';
            print '<script>window.location.assign("register.php");</script>';
        }
    } else {
        print '<script>alert("Passwörter nicht identisch!");</script>';
        print '<script>window.location.assign("register.php");</script>';
    }
}
?>