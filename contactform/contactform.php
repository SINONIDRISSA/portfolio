<?php
// Remplacez par votre adresse Gmail
$to = 'idrissasinon710@gmail.com';

// Sécurisation des données reçues
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

if ($name && $email && $message) {
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $mail_subject = $subject ? $subject : "Nouveau message depuis le portfolio";
    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $mail_subject, $body, $headers)) {
        echo 'OK';
    } else {
        echo 'Erreur lors de l\'envoi. Vérifiez la configuration du serveur.';
    }
} else {
    echo 'Veuillez remplir tous les champs.';
}
?>
