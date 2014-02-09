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
          $q->bind_param('ssssss', $sender_id, $reciever_id, $title, $body, $sender_email, $sender_name);
          if($q->execute())
          {
              $q->close();
              return true;
          }
          $q->close();
      }
    }
    return false;
  }
?>