<?php
$json = file_get_contents('comments.json');
$json = json_decode($json, true);
$json["data"][] = $_POST;
$json = json_encode($json);
file_put_contents('comments.json', $json);
echo "<h3>".$_POST["name"]."</h3><h4>".$_POST["time"].", ".$_POST["date"]."</h4><p>".$_POST["comment"]."</p>"
?>