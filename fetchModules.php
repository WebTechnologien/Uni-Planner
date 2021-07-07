<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once ("database.php");
global $conn;
mysqli_set_charset($conn,"UTF8");

session_start();
$uid= htmlspecialchars($_SESSION["uid"]);
$pID = htmlspecialchars($_GET['p']);

$result = $conn->query("SELECT modul.mid, titel,titel_long, cp, semester,pflicht, wiSe,prufungsleistung,prfungsvorleistung,inhalte,verantwortung,dozent,Voraussetzungen,Vorraussetzung_fuer,  
                                mpp.pID, listID, posID  
                               FROM modul 
                                INNER JOIN moduls_plan_pos mpp on modul.mID = mpp.mID
                                INNER JOIN plan p on mpp.pID = p.pID AND p.uid = mpp.uid
                                WHERE p.uid = $uid AND p.pID = $pID
                                  ORDER BY listID, posID");

if ($result) {
    $outp = "[";

    while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "[") {$outp .= ",";}

        $outp .= '{"modulID":"' . $rs["mid"] . '",';
        $outp .= '"titel":"' . $rs["titel"] . '",';
        $outp .= '"titel_long":"' . $rs["titel_long"] . '",';
        $outp .= '"Creditpoints":"' . $rs["cp"] . '",';
        $outp .= '"Semester":"' . $rs["semester"] . '",';
        $outp .= '"WiSe":"' . $rs["wiSe"] . '",';
        $outp .= '"Inhalte":"' . $rs["inhalte"] . '",';
        $outp .= '"Verantwortung":"' . $rs["verantwortung"] . '",';
        $outp .= '"Dozent":"' . $rs["dozent"] . '",';
        $outp .= '"Prüfungsleistung":"' . $rs["prufungsleistung"] . '",';
        $outp .= '"Prüfungsvorleistung":"' . $rs["prfungsvorleistung"] . '",';
        $outp .= '"Voraussetzungen":"' . $rs["Voraussetzungen"] . '",';
        $outp .= '"Vorraussetzung_fuer":"' . $rs["Vorraussetzung_fuer"] . '",';
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



