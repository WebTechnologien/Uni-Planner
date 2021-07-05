<?php
include_once ("database.php");
global $conn;
header("Content-Type: application/json; charset=UTF-8");

$obj = json_decode($_POST["semArray"], true);

mysqli_set_charset($conn, "UTF8");
session_start();
$uid = $_SESSION["uid"];
$planID = htmlspecialchars($_POST['planID']);

$xlength = count($obj);
for ($x = 0; $x < $xlength; $x++) {

    $ylength = count($obj[$x]);
    for ($y = 0; $y < $ylength; $y++) {
        $mid = htmlspecialchars($obj[$x][$y]['modulID']);
        $result = $conn->query("REPLACE INTO moduls_plan_pos(mID, pID,uid, listID, posID) 
        VALUES('$mid',$planID,$uid,$x,$y);");
    }
}

if ($result) {
    echo($result);
} else {
    echo(mysqli_error($conn));
}
$conn->close();
?>
