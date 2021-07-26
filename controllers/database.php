<?php
    require 'loadCred.php';

    $mem = new Memcached();
    $mem->addServer("127.0.0.1", 11211);

    $result = $mem->get("cred");

    if($result){
        $config = json_decode($result,true);
    }else{
        $config = json_decode(get_credentials(),true);
    }

    $connect = new mysqli($config['DB_HOST'],$config['DB_USERNAME'],$config['DB_PASSWORD'],$config['DB_DATABASE']);

?>
