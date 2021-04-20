<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "uni-planner");
if($conn->connect_error){
    die("Connection failed".$conn->connect_error);
}

$result = $conn->query("SELECT titel, kuerzel, semester, modul.mid, pID, listID, posID  
                               FROM modul 
                                INNER JOIN moduls_plan_pos mpp on modul.mID = mpp.mID");

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"ModulID":"'  . $rs["mid"] . '",';
    $outp .= '{"PlanID":"'  . $rs["pID"] . '",';
    $outp .= '{"listID":"'  . $rs["listID"] . '",';
    $outp .= '{"Titel":"'  . $rs["titel"] . '",';
    $outp .= '"Kuerzel":"'  . $rs["kuerzel"] . '",';
    $outp .= '"Semester":"'   . $rs["semester"] . '",';
    $outp .= '"posID":"'   . $rs["posID"] .      '"}';
}
$outp .="]";

$conn->close();

echo($outp);
?>


