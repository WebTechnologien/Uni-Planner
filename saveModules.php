<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "uni-planner");
if ($conn->connect_error) {
    die("Connection failed" . $conn->connect_error);
}

$mid =0;
$pID =0;
$listID =0;
$posID =0;




$result = $conn->query("REPLACE INTO moduls_plan_pos(mID, pID, listID, posID) VALUES ($mid,$pID,$listID,$posID)");

$conn->close();
if ($result){
    $conn->close();
    //ToDo Log or some Feedback
    echo($result);
}else{
    $conn->close();
	echo(mysqli_error ($conn));
}
?>
