<?php
$username = $_GET['username'];
if ($username){
  echo  $username;
}else{
   echo "提交失败";
}
