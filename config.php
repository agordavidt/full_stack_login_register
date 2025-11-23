<?php

// connect to the database


$host = 'localhost';
$user = 'root';
$password = "";
$database = "mmstores_db";


// establish connection
$conn = new mysqli($host, $user, $password, $database);


// check for error after connection
if ($conn->connect_error){
    die("Connection failed: ". $conn->connect_error);

}


?>