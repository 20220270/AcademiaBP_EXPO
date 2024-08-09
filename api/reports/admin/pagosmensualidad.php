<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once ('../../helpers/report.php');
// Se incluyen las clases para el acceso a datos de clientes.
require_once ('../../models/data/pagosmensualidad_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Mensualidades pagadas');


// Se instancia el modelo Cliente para obtener los datos.
$PagosModel = new PagosMensualidadData;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataPagos = $PagosModel->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(64, 136, 64);
    $pdf->setTextColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 8);

    $pdf->cell(55, 10, 'Nombre del alumno', 1, 0, 'C', 1);
    $pdf->cell(55, 10, 'Nombre responsable', 1, 0, 'C', 1);
    $pdf->cell(25, 10, 'Cantidad pagada', 1, 0, 'C', 1);
    $pdf->cell(25, 10, 'Fecha de pagó', 1, 0, 'C', 1);

    // Se establece la fuente para los datos de los clientes.
    $pdf->setFont('Arial', '', 8);

    // Recorremos los datos de los clientes
    foreach ($dataPagos as $Pagos) {
        $pdf->setTextColor(0, 0, 0);

        // Nombre del alumno
        $pdf->cell(55, 10, $pdf->encodeString($Pagos['Nombre']), 1, 0, 'C');

        // Correo
        $pdf->cell(55, 10, $Pagos['NombreCliente'], 1, 0, 'C');
    
         // Telefono del cliente
         $pdf->cell(25, 10, $Pagos['mensualidad_pagar'], 1, 0, 'C');

          // Estado del cliente
        $pdf->cell(25, 10, $clientePagos['fecha_pago'], 1, 1, 'C');
    }
} else {
    // Si no hay clientes registrados
    $pdf->cell(200, 10, $pdf->encodeString('No hay Pagos registrados'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Pagos de mensualidad.pdf');
