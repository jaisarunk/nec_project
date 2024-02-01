<?php
header('Content-Type:application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Controll-Allow-Methods: POST');
header('Header-Controll-Allow-Headers: Origin, Access-Controll-Allow-Headers, Content-Type, Access-Controll-Allow-Methods, Authorization, X-Requested-With,  Access-Control-Request-Headers');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $json_data = file_get_contents("php://input");

    // Decode the JSON data
    $data = json_decode($json_data, true); // Set the second parameter to true for an associative array
    // Check if the JSON decoding was successful
    if ($data !== null) {
        include_once('DbConnect.php');
        $c_uname = $data['c_uname'];        
        $sql = "SELECT `username` FROM `users` WHERE `username`='{$c_uname}'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
              echo json_encode(array('message'=>'User already Exist!.','username'=>$username,'status'=>false));
          } 
          else 
          {
            echo json_encode(array('message'=>'UserName Available.','status'=>true));
          }
          $conn->close();
    } else {
        // JSON decoding failed
        echo json_encode(array('message'=>'Invalid JSON data.','status'=>false));
    }
}
else {
    echo 'Invalid Request Method';
    echo json_encode(array('message'=>'Invalid Request Method.','status'=>false));
}
?>