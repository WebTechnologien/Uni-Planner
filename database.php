<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "uni-planner";

$conn = new mysqli($host,$username,$password,$database);

if ($conn->connect_error) {
    die("Connection failed" . $conn->connect_error);
}

//include_once ("database.php");