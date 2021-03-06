<?php
include_once("database.php");
global $conn;
session_start();
$bool = true;
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = mysqli_real_escape_string($conn, $_POST['registername']);
    $password = password_hash(mysqli_real_escape_string($conn, $_POST['registerpasswort']), PASSWORD_BCRYPT);
    $password2 = password_hash(mysqli_real_escape_string($conn, $_POST['registerpasswort2']), PASSWORD_BCRYPT);
    $table_users = null;
    $query = mysqli_query($conn, "Select * from users");
    while ($row = mysqli_fetch_array($query)) {
        $table_users = $row['username'];
        if ($username == $table_users) {
            $bool = false;
            header("Location:register.php?exists=true");
            break;
        }
    }
    if ($bool) {
        mysqli_query($conn, "INSERT INTO users (username, pwd) VALUES ('$username', '$password')");
        $query2 = mysqli_query($conn, "Select uid from users where username = '$username'");
        $row2 = mysqli_fetch_array($query2);
        $userid = intval($row2['uid']);

        mysqli_query($conn, "INSERT INTO plan (pID, uid, pname)
                            VALUES (1, $userid, 'plan1')");
        mysqli_query($conn, "INSERT INTO plan (pID, uid, pname)
                            VALUES (2, $userid, 'plan2')");
        mysqli_query($conn, "INSERT INTO plan (pID, uid, pname)
                            VALUES (3, $userid, 'plan3')");
        for ($i = 1; $i < 4; $i++) {

            $result = mysqli_query($conn, "insert into moduls_plan_pos (mID, pID, uid, listID, posID)
                                        values  ('WK_1101', $i, $userid, 1, 0),
                                                ('WK_1103', $i, $userid, 4, 0),
                                                ('WK_1104', $i, $userid, 3, 0),
                                                ('WK_1105', $i, $userid, 5, 0),
                                                ('WK_1106', $i, $userid, 4, 1),
                                                ('WK_1107', $i, $userid, 5, 1),
                                                ('WK_1108', $i, $userid, 4, 2),
                                                ('WK_1109', $i, $userid, 4, 3),
                                                ('WK_1110', $i, $userid, 6, 0),
                                                ('WK_1114', $i, $userid, 6, 1),
                                                ('WK_1115', $i, $userid, 7, 0),
                                                ('WK_1116', $i, $userid, 7, 1),
                                                ('WK_1121', $i, $userid, 7, 2),
                                                ('WK_1201', $i, $userid, 1, 1),
                                                ('WK_1203', $i, $userid, 2, 0),
                                                ('WK_1204', $i, $userid, 2, 1),
                                                ('WK_1208', $i, $userid, 3, 1),
                                                ('WK_1210', $i, $userid, 2, 2),
                                                ('WK_1220', $i, $userid, 3, 2),
                                                ('WK_1301', $i, $userid, 1, 2),
                                                ('WK_1302', $i, $userid, 2, 3),
                                                ('WK_1304', $i, $userid, 3, 3),
                                                ('WK_1305', $i, $userid, 3, 4),
                                                ('WK_1307', $i, $userid, 6, 2),
                                                ('WK_1401', $i, $userid, 1, 3),
                                                ('WK_1402', $i, $userid, 2, 4),
                                                ('WK_1403', $i, $userid, 3, 5),
                                                ('WK_1420', $i, $userid, 2, 5),
                                                ('WK_1504', $i, $userid, 6, 3),
                                                ('WK_1520', $i, $userid, 1, 4),
                                                ('WK_1601', $i, $userid, 0, 0),
                                                ('WK_1602', $i, $userid, 0, 1),
                                                ('WK_1603', $i, $userid, 0, 2),
                                                ('WK_1604', $i, $userid, 0, 3),
                                                ('WK_1605', $i, $userid, 0, 4),
                                                ('WK_1606', $i, $userid, 0, 5),
                                                ('WK_1609', $i, $userid, 0, 6),
                                                ('WK_1610', $i, $userid, 0, 7),
                                                ('WK_1611', $i, $userid, 0, 8),
                                                ('WK_1612', $i, $userid, 0, 9),
                                                ('WK_1613', $i, $userid, 0, 10),
                                                ('WK_1614', $i, $userid, 0, 11),
                                                ('WK_1615', $i, $userid, 0, 12);");
        }
        $conn->close();
        header("Location:login.php?success=true");
    }
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Uni-Planner Registrierung</title>
    <link rel="shortcut icon" type="image/x-icon" href="images/logo.png">
    <link rel="stylesheet" href="css/register.css">
</head>
<body>
<div>
    <div id="left_div">
        <div id="text_div">
            Keep <img id="logo" src="images/logo.png" alt="Logo"> the good work
        </div>
    </div>
    <div id="right_div">
        <p id="register_text">Registrierung</p>
        <div id="box_register">
            <form action="register.php" method="POST">
                Benutzername:
                <br>
                <div class="tooltip">
                    <input id="username_textfield" type="text" name="registername" required="required">
                    <span id="tooltip1" class="tooltiptext">Benutzername bereits vergeben!</span>
                </div>
                Passwort:
                <br>
                <div class="inputWithIcon">
                    <input id="password1_textfield" type=password name="registerpasswort" required="required"
                           oninput='passwordcheck();'>
                    <img id="icon1" alt="" src="">
                </div>
                Passwort wiederholen:
                <br>
                <div class="inputWithIcon">
                    <input id="password2_textfield" type=password name="registerpasswort2" required="required"
                           oninput='passwordcheck();'>
                    <img id="icon2" alt="" src="">
                </div>
                <input id="button_register" type="submit" value="Registrieren" disabled>
            </form>
            Bereits registriert?
            <br>
            <button id="button_login" onclick="document.location='login.php'">
                Einloggen
            </button>
        </div>
        <footer><small>&copy; Copyright 2021, Peter Hemmann & Dominic Eckerle</small></footer>
    </div>
</div>
</body>
</html>

<script>
    const password1 = document.getElementById('password1_textfield');
    const password2 = document.getElementById('password2_textfield');
    const icon1 = document.getElementById('icon1');
    const icon2 = document.getElementById('icon2');
    const button = document.getElementById('button_register');

    const passwordcheck = function () {
        if (password1.value === password2.value) {
            icon1.setAttribute("src", "images/Haken.png");
            icon2.setAttribute("src", "images/Haken.png");
            button.disabled = false;
        } else {
            icon1.setAttribute("src", "images/Kreuz.png");
            icon2.setAttribute("src", "images/Kreuz.png");
            button.disabled = true;
        }
    };
</script>

<?php
    if (isset($_GET["exists"])&&$_GET["exists"]=="true") {
        print '<script>document.getElementById("tooltip1").style.visibility = "visible";</script>';
    }
?>
