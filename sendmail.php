<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail -> CharSet = 'utf-8';
$mail -> setLanguage('ru','phpmailer/language');
$mail -> isHTML(true);

$mail -> setFrom('todd-45@mail.ru');
$mail -> addAddress('todd-45@mail.ru');
$mail -> Subject('Test');

$body = '<h1>Test</h1>';

if(trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Имя:</strong>' .$_POST['name'].'</p> ';
}
if(trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Телефон:</strong>' .$_POST['tel'].'</p> ';
}

// отправляем
if(!$mail -> send()) {
    $message = 'error';
} else {
    $message = 'данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>
