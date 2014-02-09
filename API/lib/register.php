<?php
include_once('db.php');

function check_email_address($email) {

    if (preg_match('|^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$|i', $email)) {
        return true;
    }

    return false;
}

function emailTaken($email) {
    global $db_link;

    if($q = $db_link->prepare("SELECT * FROM users WHERE email = ?"))
    {
        $q->bind_param('s', $email);
        $q->execute();
        $q->store_result();
    }
    if ($q->errno) {
        return 1;
    }

    return $q->affected_rows;
}

function addNewUser($email, $password, $salt, $name, $membertype, $loc, $phone_num) {
    global $db_link;
    if($q = $db_link->prepare("INSERT INTO users (`email`, `password`, `salt`, `name`, `membership_type`, `location`, `phone_number`) VALUES (?, ?, ?, ?, ?, ?, ?)"))
    {
        $q->bind_param('sssssss', $email, $password, $salt, $name, $membertype, $loc, $phone_num);
        if($q->execute())
        {
            $q->close();
            return true;
        }
        $q->close();
    }
    return false;
}

function dbRegister($email, $password, $salt, $name, $membertype, $loc, $phone_num) {
    if(!check_email_address($email))
    {
        return 1;
    }

    if(emailTaken($email)) {
        return 2;
    }

    if(addNewUser($email, $password, $salt, $name, $membertype, $loc, $phone_num)) {
        dbSendMessage($email, 1, "Welcome to Step Up Network!", "At this site you are able to get the latest news about upcoming events! You can also chat with fellow mentors and mentees \
            \n\nWe will also be sending out blast messages on occasion for event updates, so be sure to check the site occasionally!", "admin@suwn.com", "Turtle-Saurus");
        return 0;
    } else {
        return 5;
    }
}

function dbUpdateUser($uid,$name, $membertype, $loc, $access_level) {
      global $db_link;

      if($q = $db_link->prepare("UPDATE users SET `name`=?, `membership_type`=?, `location`=?, `access_level`=? WHERE `_id`=?"))
      {
          $q->bind_param('sssss', $name, $membertype, $loc, $access_level, $uid);
          if($q->execute())
          {
              $q->close();
              return true;
          }
          $q->close();
      }
      return false;
    }
?>