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
        // Supongamos que el correo del cliente ya se ha almacenado en la sesión
        session_start();
        $correoCliente = $_SESSION['correoCliente'] ?? null;

        if ($correoCliente) {
            // Consultar el código de autenticación y la fecha de expiración en la base de datos
            $query = "SELECT codigo_acceso, fecha_expiracion_codigo FROM tb_clientes WHERE correo_cliente = ?";
            $result = Database::getRow($query, [$correoCliente]);

            if ($result) {
                $codigoAlmacenado = $result['codigo_acceso'];
                $fechaExpiracion = $result['fecha_expiracion_codigo'];

                // Verificar si el código ingresado es correcto y no ha expirado
                if ($codigoIngresado === $codigoAlmacenado && strtotime($fechaExpiracion) > time()) {
                    // Aquí puedes añadir el código para iniciar sesión
                    $response['status'] = true;
                    $response['message'] = 'Código válido. Iniciando sesión...';

                    // Por ejemplo, redirigir a la página de inicio
                    // header('Location: /pagina_inicio.php');
                    // exit;
                } else {
                    $response['message'] = 'Código inválido o ha expirado.';
                }
            } else {
                $response['message'] = 'Correo electrónico no encontrado.';
            }
        } else {
            $response['message'] = 'No se ha encontrado el correo electrónico en la sesión.';
        }
    } else {
        $response['message'] = 'El código es requerido.';
    }

    echo json_encode($response);
} else {
    echo json_encode(['status' => false, 'message' => 'Método no permitido.']);
}
