<?php
require("./init.php");
$sql="select * from ms_food";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));
