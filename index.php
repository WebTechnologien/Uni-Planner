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
    mysqli_select_db($conn, "uni-planner") or die ("Cannot connect to database");
    $query = mysqli_query($conn, "Select * from user");
    while($row = mysqli_fetch_array($query)) {
        $table_usernames = $row['username'];
        $table_passwords = $row['pwd'];
        if ($_POST["loginname"] == $table_usernames && $_POST["loginpasswort"] == $table_passwords) {
            $_SESSION["login"] = 1;
            header('Location: index.html');
            exit;
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