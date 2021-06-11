<?php
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "uni-planner");
mysqli_set_charset($conn, "UTF8");

if ($conn->connect_error) {
    die("Connection failed" . $conn->connect_error);
}
session_start();
$userid = $_SESSION["uid"];
$planID = htmlspecialchars($_POST['planID']);

$result = mysqli_query($conn, "replace into moduls_plan_pos (mID, pID, uid, listID, posID)
                                        values  ('WK_1101', $planID, $userid, 1, 0),
                                                ('WK_1103', $planID, $userid, 4, 0),
                                                ('WK_1104', $planID, $userid, 3, 0),
                                                ('WK_1105', $planID, $userid, 5, 0),
                                                ('WK_1106', $planID, $userid, 4, 1),
                                                ('WK_1107', $planID, $userid, 5, 1),
                                                ('WK_1108', $planID, $userid, 4, 2),
                                                ('WK_1109', $planID, $userid, 4, 3),
                                                ('WK_1110', $planID, $userid, 6, 0),
                                                ('WK_1114', $planID, $userid, 6, 1),
                                                ('WK_1115', $planID, $userid, 7, 0),
                                                ('WK_1116', $planID, $userid, 7, 1),
                                                ('WK_1121', $planID, $userid, 7, 2),
                                                ('WK_1201', $planID, $userid, 1, 1),
                                                ('WK_1203', $planID, $userid, 2, 0),
                                                ('WK_1204', $planID, $userid, 2, 1),
                                                ('WK_1208', $planID, $userid, 3, 1),
                                                ('WK_1210', $planID, $userid, 2, 2),
                                                ('WK_1220', $planID, $userid, 3, 2),
                                                ('WK_1301', $planID, $userid, 1, 2),
                                                ('WK_1302', $planID, $userid, 2, 3),
                                                ('WK_1304', $planID, $userid, 3, 3),
                                                ('WK_1305', $planID, $userid, 3, 4),
                                                ('WK_1307', $planID, $userid, 6, 2),
                                                ('WK_1401', $planID, $userid, 1, 3),
                                                ('WK_1402', $planID, $userid, 2, 4),
                                                ('WK_1403', $planID, $userid, 3, 5),
                                                ('WK_1420', $planID, $userid, 2, 5),
                                                ('WK_1504', $planID, $userid, 6, 3),
                                                ('WK_1520', $planID, $userid, 1, 4),
                                                ('WK_1601', $planID, $userid, 0, 0),
                                                ('WK_1602', $planID, $userid, 0, 1),
                                                ('WK_1603', $planID, $userid, 0, 2),
                                                ('WK_1604', $planID, $userid, 0, 3),
                                                ('WK_1605', $planID, $userid, 0, 4),
                                                ('WK_1606', $planID, $userid, 0, 5),
                                                ('WK_1609', $planID, $userid, 0, 6),
                                                ('WK_1610', $planID, $userid, 0, 7),
                                                ('WK_1611', $planID, $userid, 0, 8),
                                                ('WK_1612', $planID, $userid, 0, 9),
                                                ('WK_1613', $planID, $userid, 0, 10),
                                                ('WK_1614', $planID, $userid, 0, 11),
                                                ('WK_1615', $planID, $userid, 0, 12);");


if ($result) {
    echo($result);
} else {
    echo(mysqli_error($conn));
}
$conn->close();
?>