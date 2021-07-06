<?php
    session_start();
    unset($_SESSION["uid"]);
    unset($_SESSION["username"]);
    header("Location:login.php");
?>
<!--angelehnt an logout.php von: https://www.studentstutorial.com/php/login-logout-with-session -->

