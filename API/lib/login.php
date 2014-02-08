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
        return $info['uid'];
    } else {
        return null;
    }
}

function dbLogin($email, $pass) {
    return confirmuser($email,$pass);
}

?>