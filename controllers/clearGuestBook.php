<?php
    require 'database.php';

    if($_GET['a']=="vincent"){
        $q = $connect->prepare("TRUNCATE TABLE guestbook");
        $q->execute();
        $q->close();

        $response = array("error" => "0");
        echo json_encode($response);
    }

?>