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
        $c_password = $data['c_password'];
        $c_name = $data['c_name'];
        $c_email = $data['c_email'];
        $c_mobile = $data['c_mobile'];
        $c_gender = $data['c_gender'];
        $c_country = $data['c_country'];

        if(isset($data['c_file']))
        {
            $file = $data['c_file'];
            $fileName = $file['fileName'];
            $fileType = $file['fileType'];
            $fileContentBase64 = $file['fileContent'];

            // Check file type
            $allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
            if (!in_array($fileType, $allowedFileTypes)) {
                echo json_encode(array('message'=>'Unsupported file type.','status'=>false));exit;
            }
            // Decode Base64 to get the original file content
            $fileContent = base64_decode(preg_replace('#^data:[\w/]+;base64,#i', '', $fileContentBase64));

            // Save the file to the server
            $uploadDir = 'uploads/';
            if(!is_dir($uploadDir))
            {
                mkdir($uploadDir, 0777);
            }
            $newfileName = date('YmdHis'). '_' . str_replace(' ', '_', $fileName);
            $uploadPath = $uploadDir . $newfileName;
            if (file_put_contents($uploadPath, $fileContent)) {
                //$response = array("message" => "Data with File uploaded successfully");
            } else {
                $newfileName = '-';
            }
        }
        else
        {
            $newfileName = '-';
        }
        $sql = "INSERT INTO `users`( `username`, `password`, `name`, `email`, `mobile`, `profile`, `gender`, `country`) VALUES ('{$c_uname}','{$c_password}', '{$c_name}', '{$c_email}', '{$c_mobile}', '{$newfileName}', '{$c_gender}', '{$c_country}')";
        //$result = mysqli_query($conn, $sql);
        $result = $conn->query($sql);
        if ($result) 
        {
            echo json_encode(array('message'=>'Record Inserted Successfully.','status'=>true));
        }
        else {
            echo json_encode(array('message'=>'Record Not Inserted Successfully.','status'=>false));
        }
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
