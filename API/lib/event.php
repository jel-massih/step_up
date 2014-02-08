<?php
	function dbGetEvents() {
  	global $db_link;
  	$result = array();

	  if($q = $db_link->prepare("SELECT * FROM events"))
	  {
	    $q->execute();
	    $q->bind_result($eid,$name, $desc,$loc,$start_date, $start_time);

	    while($q->fetch()) {
	    	array_push($result, array("id"=>$eid, "event_name"=>$name, "event_desc"=>$desc, "event_loc"=>$loc,"event_start_date"=>$start_date,"event_start_time"=>$start_time));
	    }

	    if ($q->errno) {
	      return null;
	  	}
	  }


	  return json_encode($result);
	}

	function dbGetEventsByLocation($location) {
		global $db_link;
	  if($q = $db_link->prepare("SELECT * FROM events WHERE `location` = ?"))
	  {
      $q->bind_param('s', $location);
	    $q->execute();
	    $q->bind_result($eid,$name, $desc,$loc,$start_date, $start_time);

	    while($q->fetch()) {
	    	array_push($result, array("id"=>$eid, "event_name"=>$name, "event_desc"=>$desc, "event_loc"=>$loc,"event_start_date"=>$start_date,"event_start_time"=>$start_time));
	    }

	    if ($q->errno) {
	      return null;
	  	}
	  }


	  return json_encode($result);
	}
?>