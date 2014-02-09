<?php
	session_start();
	require 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();
	require 'lib/login.php';
	require 'lib/register.php';
	require 'lib/event.php';
	require 'lib/message.php';

	$app = new \Slim\Slim();

  $app->get('/login/:email', 'returnSalt');
	$app->post('/login/:email', 'login');
	$app->post('/logout', authenticate(), 'logout');
	$app->post('/users', 'register');
	$app->get('/users', 'getUserList');
	$app->get('/user', authenticate(), 'getCurrentUserInfo');
	$app->get('/events', 'getEvents');
	$app->get('/events/:location', 'getEventsByLocation');
	$app->get('/messages', authenticate(), 'getLoggedInUserMessages');

	$app->run();

	function login($email) {
		if(!empty($email) && !empty($_POST['password'])) {
			$email = trim(strtolower($email));
      $user = dbLogin($email, $_POST['password']);
			if($user != null) {
				$_SESSION['user'] = $user;
				echo(json_encode($user));
			} else {
				echo('{"error":{"text":"Email or Password was Incorrect"}}');
			}
		} else {
			echo('{"error":{"text":"Please Enter Email and Password"}}');
		}
	}

  function returnSalt($email) {
    if(!empty($email)) {
      $email = trim(strtolower($email));
      $salt = getSalt($email);

      if(!empty($salt)) {
        echo('{"salt":"'.$salt.'"}');
      } else {
        echo('{"error":{"text":"Email was Incorrect"}}');
      }
    } else {
      echo('{"error":{"text":"Please Enter Email and Password"}}');
    }
  }

	function logout() {
		unset($_SESSION['user']);
		echo('{"success":{"text":"Successfully Logged Out"}}');
	}

	function register() {
    $_POST = json_decode(file_get_contents('php://input'), true);
		if(empty($_POST['email']) || empty($_POST['password']) || empty($_POST['salt'])) {
			echo('{"error":{"text":"Please Fill in All Fields"}}');
		} else {
			$_POST['email'] = trim(strtolower($_POST['email']));
			$error_code = dbRegister($_POST['email'], $_POST['password'], $_POST['salt']);
			switch($error_code) {
				case 0:
					echo('{"success":{"text":"Registration Successful!"}}');
					break;
				case 1:
					echo('{"error":{"text":"Please enter a valid email address"}}');
					break;
				case 2:
					echo('{"error":{"text":"Sorry! That email is already taken"}}');
					break;
				case 3:
					echo('{"error":{"text":"Password must be at least 8 characters"}}');
					break;
				case 4:
					echo('{"error":{"text":"Your Passwords do not match!"}}');
					break;
				default:
					echo('{"error":{"text":"Something Went Horribly Wrong! Please try again."}}');
					break;
			}
		}
	}

	function getCurrentUserInfo() {
		if($_SESSION['user'] != null) {
			echo(json_encode($_SESSION['user']));
		} else {
			echo('{"error":{"text":"Failed to retrieve User Info"}}');
		}
	}

	function getUserList() {
		$results = dbGetUsers();
		if($results != null) {
			echo($results);
		} else {
			echo('{"error":{"text":"Failed to retrieve Users"}}');
		}
	}

	function getEvents() {
		$results = dbGetEvents();
		if($results != null) {
			echo($results);
		} else {
			echo('{"error":{"text":"Failed to retrieve Events"}}');
		}
	}

	function getEventsByLocation($location) {
		$results = dbGetEventsByLocation($location);
		if($results != null) {
			echo($results);
		} else {
			echo('{"error":{"text":"Failed to retrieve Events"}}');
		}
	}

	function getLoggedInUserMessages() {
		if($_SESSION['user'] != null) {
			$results = dbGetMessages($_SESSION['user']['id']);
			if($results != null) {
				echo($results);
			} else {
				echo('{"error":{"text":"Failed to retrieve Messages"}}');
			}
		} else {
			echo('{"error":{"text":"Failed to retrieve User ID"}}');
		}
	}

	function authenticate() {
		return function() {
			global $app;
			if(!isset($_SESSION['user'])) {
				$app->halt(401,"Access Denied");
			} else {
				return true;
			}
		};
	}
?>