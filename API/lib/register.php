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

function addNewUser($email, $password, $salt) {
    global $db_link;
    if($q = $db_link->prepare("INSERT INTO users (`email`, `password`, `salt`) VALUES (?, ?, ?)"))
    {
        $q->bind_param('sss', $email, $password, $salt);
        if($q->execute())
        {
            $q->close();
            return true;
        }
        $q->close();
    }
    return false;
}

function dbRegister($email, $password, $salt) {
    if(!check_email_address($email))
    {
        return 1;
    }

    if(emailTaken($email)) {
        return 2;
    }

    if(addNewUser($email, $password, $salt)) {
        return 0;
    } else {
        return 5;
    }
}
?>