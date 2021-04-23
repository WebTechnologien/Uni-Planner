<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "uni-planner");
mysqli_set_charset($conn,"UTF8");

if($conn->connect_error){
    die("Connection failed".$conn->connect_error);
}

$result = $conn->query("SELECT modul.mid, titel, semester,  pID, listID, posID  
                               FROM modul 
                                INNER JOIN moduls_plan_pos mpp on modul.mID = mpp.mID
                                  ORDER BY listID, posID");

if ($result) {
    $outp = "[";

    while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "[") {$outp .= ",";}

        $outp .= '{"modulID":"' . $rs["mid"] . '",';
        $outp .= '"planID":"' . $rs["pID"] . '",';
        $outp .= '"titel":"' . $rs["titel"] . '",';
        $outp .= '"listID":"' . $rs["listID"] . '",';
        $outp .= '"semester":"' . $rs["semester"] . '"}';
    }

    $outp .= "]";
    echo($outp);
}
else{
    echo(mysqli_error ($conn));
}
$conn->close();
?>


