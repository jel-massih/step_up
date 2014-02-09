<?php 


$url = 'https://api.sendgrid.com/api/mail.send.json';

$data = array('api_user' => 'theflamingskunk', 'api_key' => 'Test123!','to' => 'jel-massih@hotmail.com','toname' => 'Jason EL-Massih','subject' => 'Example_Subject','text' => 'testingtextbody','from'=>'info@domain.com');
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
?>