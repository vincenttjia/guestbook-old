<?php
    require 'database.php';

    if(isset($_POST['name'])){
        $name = $_POST['name'];
    }else{
        echo json_encode(array("error" => "1","message" => "Name can not be empty"));
        die();
    }

    if(isset($_POST['content'])){
        $content  = $_POST['content'];
    }else{
        echo json_encode(array("error" => "1","message" => "Message can not be empty"));
        die();
    }

    $q = $connect->prepare("INSERT INTO `guestbook` VALUES ('',?,?,now())");
    $q->bind_param('ss',$name,$connect);
    $q->execute();
    $affected_rows = $q->affected_rows;
    $q->close();

    if($affected_rows>0){
        echo json_encode(array("error" => "0"));
    }else{
        echo json_encode(array("error" => "0","message" => "Undefined Error!"));
    }
?>