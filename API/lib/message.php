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
        array_push($result, array("id"=>$mid, "message_title"=>$loc,"message_body"=>$start_date,"sender_id"=>$sender_id));
      }

      if ($q->errno) {
        return null;
      }
    }
    return json_encode($result);
  }
?>