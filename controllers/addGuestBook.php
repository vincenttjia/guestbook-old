<?php
    require 'database.php';

    if(!empty(trim($_POST['name']))){
        $name = $_POST['name'];
    }else{
        echo json_encode(array("error" => "1","message" => "Name can not be empty"));
        die();
    }

    if(!empty(trim($_POST['content']))){
        $content  = $_POST['content'];
    }else{
        echo json_encode(array("error" => "1","message" => "Message can not be empty"));
        die();
    }

    
    if(!empty(trim($_POST['address']))){
        $address  = $_POST['address'];
    }else{
        echo json_encode(array("error" => "1","message" => "Address can not be empty"));
        die();
    }

    $affected_rows=0;


    $q = $connect->prepare("INSERT INTO `guestbook` VALUES ('',?,?,?,now())");
    $q->bind_param('sss',$name,$content,$address);
    $q->execute();
    $affected_rows = $q->affected_rows;
    $q->close();

    
    if($affected_rows>0){
        echo json_encode(array("error" => "0"));
    }else{
        echo json_encode(array("error" => "1","message" => "Undefined Error!"));
    }
?>