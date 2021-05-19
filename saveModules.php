<?php
header("Content-Type: application/json; charset=UTF-8");

$obj = json_decode($_POST["semArray"], true);

echo $obj;

$conn = new mysqli("localhost", "root", "", "uni-planner");
mysqli_set_charset($conn,"UTF8");

if ($conn->connect_error) {
    die("Connection failed" . $conn->connect_error);
}

$xlength = count($obj);
for($x = 0; $x < $xlength; $x++) {

    $ylength = count($obj[$x]);
    for ($y = 0; $y < $ylength; $y++) {
        $mid = htmlspecialchars($obj[$x][$y]['modulID']);
        $result = $conn->query("REPLACE INTO moduls_plan_pos(mID, pID, listID, posID) 
        VALUES('$mid',1,$x,$y);");
    }
}

if ($result){
    echo($result);
}
else{
	echo(mysqli_error ($conn));
}
$conn->close();
?>
