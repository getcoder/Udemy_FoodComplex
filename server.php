<?php
$_POST = json_decode(file_get_contents("php://input"), true);  // для декодирования JSON на сервере
echo var_dump($_POST);  // берет данный пришедшие с клиента, превращает в строку и показывает на клиент