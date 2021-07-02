<script>
    function showSnackbar() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
</script>

<?php
session_start();
$message = "";




if (count($_POST)>0) {
    $conn = new mysqli("localhost", "root", "", "uni-planner");
    if ($conn->connect_error) {
        die("Connection failed" . $conn->connect_error);
    }
    $username = mysqli_real_escape_string($conn, $_POST["loginname"]);
    $password = mysqli_real_escape_string($conn, $_POST["loginpasswort"]);
    $query = mysqli_query($conn, "Select * from users where username='" . $username . "'");
    if (mysqli_num_rows($query)!=0) {
    $row = mysqli_fetch_array($query);
        if (password_verify($password, $row['pwd'])) {
            $_SESSION["uid"] = $row['uid'];
            $_SESSION["username"] = $row['username'];
        }
        else {
            $message = "Falsches Passwort!";
        }
    }
    else {
    $message = "Falscher Benutzername!";
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
            <form method="post" action="login.php">
                Benutzername:
                <br>
                <div class="tooltip">
                    <input id="username_textfield" name="loginname" required="required">
                    <span id = "tooltip1" class="tooltiptext">Falscher Benutzername!
                        <?php if($message=="Falscher Benutzername!") {
                        header("Location:login.php?success=false&password=true&username=false");
                        } ?></span>
                </div>
                Passwort:
                <br>
                <div class="tooltip">
                    <input id="password_textfield" name="loginpasswort" type=password required="required">
                    <span id = "tooltip2" class="tooltiptext">Falsches Passwort!
                        <?php if($message=="Falsches Passwort!") {
                            header("Location:login.php?success=false&password=false&username=true");
                        } ?></span>
                </div>
                <br>
                <input id="button_login" type=submit name=submit value="Einloggen">
            </form>
            Noch keinen Account?
            <br>
            <button id="button_register" onclick="document.location='register.php'">Registrieren</button>
        </div>
        <footer><small>&copy; Copyright 2021, Peter Hemmann & Dominic Eckerle</small></footer>
    </div>
    <div id="right_div">
        <div id="text_div">
            Keep <img id="logo" src="img/icons/android-chrome-512x512.png" alt="Logo"> the good work
        </div>
    </div>
</div>
<div id="snackbar">Erfolgreich registriert!</div>
</body>
</html>

<?php   if ($_GET["success"]=="true") {
            print '<script>showSnackbar();</script>';
        }
        if ($_GET["username"]=="false") {
            print '<script>document.getElementById("tooltip1").style.visibility = "visible";</script>';
        }
        if ($_GET["password"]=="false") {
            print '<script>document.getElementById("tooltip2").style.visibility = "visible";</script>';
        } ?>