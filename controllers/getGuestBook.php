<?php
require 'database.php';

$q = $connect->prepare("SELECT * FROM guestbook ORDER BY ID DESC");
$q->execute();
$res = $q->get_result();
$q->close();

$res1 = [];

while($temp = $res->fetch_assoc()){
    $res1[] = $temp;
}

$response = array("error" => "0", "result" => $res1);
echo json_encode($response);

?>