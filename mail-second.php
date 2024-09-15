<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$name = $data['footer_name'];
$tel = $data['footer_phone'];

// Контент письма
$title = 'Заявка с сайта designLift'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>'.
        '<p>Телефон: <strong>'.$tel.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

if (isset($_POST['recaptcha_response']) && !empty($_POST['recaptcha_response'])) {

	// Build POST request
	$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
	$recaptcha_secret = '6Lf3bD4qAAAAAJwWuKwVpBESO6a5-LKq6FqESv3x';
	$recaptcha_response = $_POST['recaptcha_response'];

	// Make and decode POST request
	$recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
	$recaptcha = json_decode($recaptcha);

	// Take action based on the score returned
	if ($recaptcha->score >= 0.5) {

  }else {
    die('Ошибка при проверке на робота. Пожалуйста, позвоните по номеру телефона +79268336150');
  }
}

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
  $mail->Username   = 'worksmptmail123@mail.ru'; // Логин на почте
  $mail->Password   = '1wCaV91cwTtZ7iEn3MUi'; // Пароль на почте
  $mail->SMTPSecure = 'tls';
  $mail->Port       = 587;

  $mail->setFrom('worksmptmail123@mail.ru', 'Заявка с сайта designlift.ru'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('info@designlift.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение отправлено успешно!');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено! Причина ошибки: {$mail->ErrorInfo}');
}
