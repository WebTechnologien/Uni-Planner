<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "uni-planner");
mysqli_set_charset($conn,"UTF8");

if($conn->connect_error){
    die("Connection failed".$conn->connect_error);
}

$result = $conn->query("SELECT modul.mid, titel, cp, semester,pflicht, wiSe,prufungsleistung,prfungsvorleistung,inhalte,verantwortung,dozent,  
                                pID, listID, posID  
                               FROM modul 
                                INNER JOIN moduls_plan_pos mpp on modul.mID = mpp.mID
                                  ORDER BY listID, posID");


//str_replace(chr(149),  "&#8226;",$rs["inhalte"])

if ($result) {
    $outp = "[";

    while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "[") {$outp .= ",";}

        $outp .= '{"modulID":"' . $rs["mid"] . '",';
        $outp .= '"titel":"' . $rs["titel"] . '",';
        $outp .= '"Creditpoints":"' . $rs["cp"] . '",';
        $outp .= '"semester":"' . $rs["semester"] . '",';
        $outp .= '"WiSe":"' . $rs["wiSe"] . '",';
//        $contstr  = $rs["inhalte"];
//        $contstr = str_replace("•",  " ", $contstr); //remove bullet

//        $outp .= '"Inhalte":"' . $contstr . '",';
        $outp .= '"verantwortung":"' . $rs["verantwortung"] . '",';
        $outp .= '"dozent":"' . $rs["dozent"] . '",';
        $outp .= '"Prüfungsleistung":"' . $rs["prufungsleistung"] . '",';
        $outp .= '"Prfüngsvorleistung":"' . $rs["prfungsvorleistung"] . '",';
        $outp .= '"planID":"' . $rs["pID"] . '",';
        $outp .= '"listID":"' . $rs["listID"] . '",';
        $outp .= '"posID":"' . $rs["posID"] . '"}';
    }

    $outp .= "]";
    echo($outp);
}
else{
    echo(mysqli_error ($conn));
}
$conn->close();
?>


