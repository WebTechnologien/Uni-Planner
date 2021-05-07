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
            <form method="POST" action="index.php">
                Username:
                <br>
                <input id="username_textfield" name="loginname">
                Passwort:
                <br>
                <input id="password_textfield" name="loginpasswort" type=password>
                <br>
                <input id="button_login" type=submit name=submit value="Login">
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