<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "uni-planner");
if($conn->connect_error){
    die("Connection failed".$conn->connect_error);
}

$result = $conn->query("SELECT mid, titel, semester from modul");

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"modulID":"'  . $rs["mid"] .         '",';
    $outp .= '"titel":"'  . $rs["titel"] .      '",';
    $outp .= '"semester":"'   . $rs["semester"] .   '"}';

}
$outp .="]";

$conn->close();

echo($outp);
?>


