<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Controll-Allow-Methods: POST");
header("Access-Controll-Allow-Headers: Content-Type");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $json_data = file_get_contents("php://input");

    // Decode the JSON data
    $data = json_decode($json_data, true); // Set the second parameter to true for an associative array
    // Check if the JSON decoding was successful
    if ($data !== null) {
        include_once('DbConnect.php');
        $c_uname = $data['username'];
        $c_password = $data['password'];
        
        $sql = "SELECT `username`, `password` FROM `users` WHERE `username`='{$c_uname}' AND `status`= 'Inactive'";
        $result = $conn->query($sql);

        if ($result->num_rows === 1) {
            // output data of each row
            $row = $result->fetch_assoc();
              $username = $row['username'];
              $password = $row['password'];
              if ($password != $c_password) {
                echo json_encode(array('message'=>'Incorrect Password!.','username'=>$username,'status'=>false));
              }
              else {
                echo json_encode(array('message'=>'Login successfully.','username'=>$username,'status'=>true));
              }
          } 
          elseif($result->num_rows === 0) 
          {
            echo json_encode(array('message'=>'User Not Exist.','status'=>false));
          }
          else {
            echo json_encode(array('message'=>'Login Failed!','status'=>false));
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