<?php
  function dbGetMessages($userid) {
    global $db_link;

    $result = array();
    if($q = $db_link->prepare("SELECT * FROM user_msgs WHERE `reciever_id` = ?"))
    {
      $q->bind_param('s', $userid);
      $q->execute();
      $q->bind_result($mid,$sender_id, $reciever_id,$title,$body);

      while($q->fetch()) {
        array_push($result, array("id"=>$mid, "message_title"=>$title,"message_body"=>$body,"sender_id"=>$sender_id));
      }

      if ($q->errno) {
        return null;
      }
    }
    return json_encode($result);
  }

  function dbSendMessage($recieverEmail, $sender_id, $title, $body) {
    global $db_link;

    $reciever_id = getIDFromEmail($recieverEmail);

    if($reciever_id != null) {
      if($q = $db_link->prepare("INSERT INTO user_msgs (`sender_id`, `reciever_id`, `title`, `body`) VALUES (?, ?, ?, ?)"))
      {
          $q->bind_param('ssss', $sender_id, $reciever_id, $title, $body);
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