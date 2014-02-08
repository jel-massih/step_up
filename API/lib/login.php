<?php
include_once('db.php');

function getSalt($email) {
    global $db_link;

    if($q = $db_link->prepare("SELECT salt FROM users WHERE email = ?"))
    {
        $q->bind_param('s', $email);
        $q->execute();
        $q->bind_result($salt);
        while($q->fetch()) {
            return $salt;
        }
    }

    return -1;
}

function getAuthInfo($email) {
    global $db_link;

    if($q = $db_link->prepare("SELECT password, _id FROM users WHERE email = ?"))
    {
        $q->bind_param('s', $email);
        $q->execute();
        $q->bind_result($password, $uid);
        while($q->fetch()) {
            return array("password"=>$password,"uid"=>$uid);
        }
    }
    return -1;
}

function confirmuser($email, $password)
{
    global $db_link;
    $info = getAuthInfo($email);
    if($info && $info['password'] == $password) {
        return dbGetUser($info['uid']);
    } else {
        return null;
    }
}

function dbLogin($email, $pass) {
    return confirmuser($email,$pass);
}

function dbGetUser($uid) {
    global $db_link;
    if($q = $db_link->prepare("SELECT * FROM users WHERE `_id` = ?"))
    {
        $q->bind_param('s', $uid);
        $q->execute();
        $q->bind_result($eid,$email, $password,$salt,$access_level, $location);

    while($q->fetch()) {
        $result = array("id"=>$eid, "email"=>$email, "password"=>$password, "salt"=>$salt,"access_level"=>$access_level,"location"=>$location);
    }

    if ($q->errno) {
      return null;
    }
    }

  return $result;
}

?>