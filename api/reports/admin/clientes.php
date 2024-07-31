<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once ('../../helpers/report.php');
// Se incluyen las clases para el acceso a datos de clientes.
require_once ('../../models/data/clientes_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Clientes Registrados');


// Se instancia el modelo Cliente para obtener los datos.
$clienteModel = new ClienteData;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataClientes = $clienteModel->readAllReport()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(13, 92, 49);
    $pdf->setTextColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 8);

    // Encabezados
    $pdf->cell(10, 10, 'ID', 1, 0, 'C', 1);
    $pdf->cell(25, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(25, 10, 'Apellido', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Correo', 1, 0, 'C', 1);
    $pdf->cell(25, 10, 'DUI', 1, 0, 'C', 1);
    $pdf->cell(25, 10, 'Telefono', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Estado', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los clientes.
    $pdf->setFont('Arial', '', 8);

    // Recorremos los datos de los clientes
    foreach ($dataClientes as $cliente) {
        $pdf->setTextColor(0, 0, 0);
        // ID del cliente
        $pdf->cell(10, 10, $cliente['id_cliente'], 1, 0, 'C');

        // Nombre
        $pdf->cell(25, 10, $pdf->encodeString($cliente['nombre_cliente']), 1, 0, 'C');

        // Apellido
        $pdf->cell(25, 10, $pdf->encodeString($cliente['apellido_cliente']), 1, 0, 'C');

        // Correo
        $pdf->cell(40, 10, $cliente['correo_cliente'], 1, 0, 'C');

        // DUI del cliente
        $pdf->cell(25, 10, $cliente['dui_cliente'], 1, 0, 'C');

         // Telefono del cliente
         $pdf->cell(25, 10, $cliente['telefono_cliente'], 1, 0, 'C');

          // Estado del cliente
        $pdf->cell(40, 10, $cliente['estado_cliente'], 1, 1, 'C');
    }
} else {
    // Si no hay clientes registrados
    $pdf->cell(200, 10, $pdf->encodeString('No hay clientes registrados'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Clientes.pdf');
?>