<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "organizer");
if($conn->connect_error){
    die("Connection failed".$conn->connect_error);
}

$result = $conn->query("SELECT titel,kürzel, semester from modul");

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"Titel":"'  . $rs["titel"] . '",';
    $outp .= '"Kuerzel":"'  . $rs["kürzel"] . '",';
    $outp .= '"Semester":"'   . $rs["semester"]       . '"}';
}
$outp .="]";

$conn->close();

echo($outp);
?>


