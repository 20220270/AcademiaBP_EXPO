<?php
require __DIR__ . '/../../api/helpers/database.php';

header('Content-Type: application/json');

// Verificar el método de solicitud
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['status' => false, 'message' => ''];

    // Obtener el código ingresado
    $codigoIngresado = $_POST['code'] ?? null;

    // Validar que se haya proporcionado el código
    if ($codigoIngresado) {
        // Iniciar la sesión para obtener el alias del administrador
        session_start();
        $usuarioAdmin = $_SESSION['aliasAdministrador'] ?? null;

        if ($usuarioAdmin) {
            // Consultar el código de autenticación y la fecha de expiración en la base de datos usando el alias
            $query = "SELECT codigo_acceso, fecha_expiracion_codigo FROM tb_administradores WHERE alias_administrador = ?";
            $result = Database::getRow($query, [$usuarioAdmin]);

            if ($result) {
                $codigoAlmacenado = $result['codigo_acceso'];
                $fechaExpiracion = $result['fecha_expiracion_codigo'];

                // Verificar si el código ingresado es correcto y no ha expirado
                if ($codigoIngresado === $codigoAlmacenado && strtotime($fechaExpiracion) > time()) {
                    // Aquí puedes añadir el código para iniciar sesión
                    $response['status'] = true;
                    $response['message'] = 'Código válido. Iniciando sesión...';

                    // Si deseas realizar acciones adicionales como redirigir al usuario, puedes hacerlo aquí
                    // Por ejemplo: establecer más variables de sesión, etc.
                    // $_SESSION['admin_logged_in'] = true;

                } else {
                    $response['message'] = 'Código inválido o ha expirado.';
                }
            } else {
                $response['message'] = 'Alias del administrador no encontrado.';
            }
        } else {
            $response['message'] = 'Alias del administrador no disponible en la sesión.';
        }
    } else {
        $response['message'] = 'El código es requerido.';
    }

    // Responder con el resultado de la validación
    echo json_encode($response);
} else {
    echo json_encode(['status' => false, 'message' => 'Método no permitido.']);
}
