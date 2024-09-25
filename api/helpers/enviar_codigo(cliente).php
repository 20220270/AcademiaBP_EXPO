<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../../api/libraries/phpmailer651/src/Exception.php';
require __DIR__ . '/../../api/libraries/phpmailer651/src/PHPMailer.php';
require __DIR__ . '/../../api/libraries/phpmailer651/src/SMTP.php';
require __DIR__ . '/../../api/helpers/database.php';

session_start(); // Iniciar la sesión
header('Content-Type: application/json');

// Función para generar un código aleatorio
function generateCode($length = 6) {
    $characters = '0123456789';
    $charactersLength = strlen($characters);
    $code = '';
    for ($i = 0; $length > $i; $i++) {
        $code .= $characters[rand(0, $charactersLength - 1)];
    }
    return $code;
}

// Verificar el método de solicitud
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['status' => false, 'message' => ''];

    // Obtener el correo electrónico del cliente
    $correoCliente = $_POST['correoCliente'] ?? null;

    // Enviar el código de autenticación al correo electrónico
    if ($correoCliente) {
        // Almacenar el correo en la sesión
        $_SESSION['correoCliente'] = $correoCliente;

        // Generar un código de autenticación
        $authCode = generateCode();
        $expirationDate = date('Y-m-d H:i:s', strtotime('+1 hour')); // El código vence en 1 hora

        // Guardar el código de autenticación y la fecha de expiración en la base de datos
        $query = "UPDATE tb_clientes SET codigo_acceso = ?, fecha_expiracion_codigo = ? WHERE correo_cliente = ?";
        $values = [$authCode, $expirationDate, $correoCliente];
        if (!Database::executeRow($query, $values)) {
            $response['message'] = 'Error al guardar el código de autenticación.';
            echo json_encode($response);
            exit;
        }

        // Enviar el código de autenticación por correo electrónico
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'sportdevelopment7@gmail.com'; // Tu correo electrónico de Gmail
            $mail->Password = 'oatk qcui omre ihbn'; // Tu contraseña o contraseña de aplicación
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Remitente y destinatario
            $mail->setFrom('sportdevelopment7@gmail.com', 'Sport Development');
            $mail->addAddress($correoCliente); // Correo electrónico del cliente

            // Asunto y cuerpo del correo
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8'; // Establecer la codificación a UTF-8
            $mail->Subject = 'Código de autenticación';
            $mail->Body = "Tu código de autenticación es: <strong>$authCode</strong>. Este código vence en 1 hora.";
            $mail->AltBody = "Tu código de autenticación: $authCode. Este código vence en 1 hora.";

            // Enviar el correo
            $mail->send();
            $response['status'] = true;
            $response['message'] = 'Te enviamos un código al correo para que puedas iniciar sesión.';
        } catch (Exception $e) {
            $response['message'] = 'No se pudo enviar el correo. Error: ' . $mail->ErrorInfo;
        }

        echo json_encode($response);
        exit;
    }

    // Si no se proporciona un correo electrónico válido
    $response['message'] = 'Correo electrónico no proporcionado.';
    echo json_encode($response);
}
?>
