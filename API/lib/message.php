<?php
  function dbGetMessages($userid) {
    global $db_link;

    $result = array();
    if($q = $db_link->prepare("SELECT * FROM user_msgs WHERE `reciever_id` = ?"))
    {
      $q->bind_param('s', $userid);
      $q->execute();
      $q->bind_result($mid,$sender_id, $reciever_id,$title,$body, $sender_email, $sender_name);

      while($q->fetch()) {
        array_push($result, array("id"=>$mid, "message_title"=>$title,"message_body"=>$body,"sender_id"=>$sender_id, "sender_name"=>$sender_name, "sender_email"=>$sender_email));
      }

      if ($q->errno) {
        return null;
      }
    }
    return json_encode($result);
  }

  function dbSendMessage($recieverEmail, $sender_id, $title, $body, $sender_email, $sender_name) {
    global $db_link;

    $reciever_id = getIDFromEmail($recieverEmail);

    if($reciever_id != null) {
      if($q = $db_link->prepare("INSERT INTO user_msgs (`sender_id`, `reciever_id`, `title`, `body`, `sender_email`, `sender_name`) VALUES (?, ?, ?, ?, ?, ?)"))
      {
          $q->bind_param('ssssss', $sender_id, $reciever_id['uid'], $title, $body, $sender_email, $sender_name);
          if($q->execute())
          {
            sendEmail($recieverEmail, $sender_name, $title, $body, $sender_email);
            if($reciever_id['phone_num'] != '') {
              sendText($reciever_id['phone_num'], $title.": ".$body);
            }
              $q->close();
              return true;
          }
          $q->close();
      }
    }
    return false;
  }

  function dbBroadcastMessage($sender_id, $title, $body, $sender_email, $sender_name) {
    global $db_link;
    $users = array();
    if($q = $db_link->prepare("SELECT _id, phone_number, email FROM users"))
    {
      $q->execute();
      $q->bind_result($eid, $phone_num, $email);

      while($q->fetch()) {
        array_push($users, array("eid"=>$eid, "phone_num"=>$phone_num, "email"=>$email));
      }
    }
    if ($q->errno) {
      return false;
    }

    $q = $db_link->prepare("INSERT INTO user_msgs (`sender_id`, `reciever_id`, `title`, `body`, `sender_email`, `sender_name`) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($users as $uid) {
      sendEmail($uid['email'], $sender_name, $title, $body, $sender_email);
      if($uid['phone_num'] != '') {
        sendText($uid['phone_num'], $title.": ".$body);
      }
      $q->bind_param('ssssss', $sender_id, $uid['uid'], $title, $body, $sender_email, $sender_name);
      $q->execute();
    }

    return true; 
  }

  function sendText($num, $msg) {
    global $twilio_sid, $twilio_token;


    try {
    $client = new Services_Twilio($twilio_sid, $twilio_token);
    $message = $client->account->messages->sendMessage(
      '5083156274', // From a valid Twilio number
      $num, // Text this number
      $msg
    );
  } catch(Exception $e) {

  }
  }
  function sendEmail($reciever, $recieverName, $subject, $body, $from) {
    global $send_key, $send_name;
    try {
    $url = 'https://api.sendgrid.com/api/mail.send.json';

    $data = array('api_user' => $send_name, 'api_key' => $send_key,'to' => $reciever,'toname' => $recieverName,'subject' => $subject,'text' => $body,'from'=>$from);
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ),
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
  } catch(Exception $e){}
  }
?>