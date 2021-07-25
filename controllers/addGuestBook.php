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

    

?>