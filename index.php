<?php

$dbHost = "192.168.0.100";
$dbUser = "root";
$dbPass = "1234";
$dbName = "dev";

$mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

if ($mysqli->connect_error) {
    die('Connection filed:' . $mysqli->connect_error);
}

printf("Connected successfully<br/>\n");

$del = true;
if ($del) {
    $delstmt = $mysqli->prepare("delete from dummy where message like '2021%'");
    $delstmt->execute();
}

$stmt = $mysqli->prepare("insert into dummy values (?)");
$stmt->bind_param("s", $date);
$date = (new DateTime())->format("Y/m/d H:i:s") . ' visited';
$stmt->execute();

$result = $mysqli->query("select * from dummy order by message desc");

printf("Returned %d rows.\n", $result->num_rows);

echo '<ul>';
while ($row = $result->fetch_row()) {
    printf("<li>%s</li>", $row[0]);
}
echo '</ul>';

phpinfo();
?>