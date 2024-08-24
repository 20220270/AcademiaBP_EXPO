<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once ('../../helpers/report.php');
// Se incluyen las clases para el acceso a datos de staffs.
require_once ('../../models/data/staff_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Miembros del staff registrados');


// Se instancia el modelo staff para obtener los datos.
$staffModel = new StaffData;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataStaff = $staffModel->readAllStaffReport()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(64, 136, 64);
    $pdf->setTextColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);

    // Encabezados
    $pdf->cell(20, 10, 'ID', 1, 0, 'C', 1);
    $pdf->cell(115, 10, 'Nombre completo', 1, 0, 'C', 1);
    $pdf->cell(50, 10, 'Encargado de', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los staffs.
    $pdf->setFont('Arial', '', 10);

    // Recorremos los datos de los staffs
    foreach ($dataStaff as $staff) {
        $pdf->setTextColor(0, 0, 0);

        $pdf->cell(20, 10, $pdf->encodeString($staff['id_staff']), 1, 0, 'C');
        $pdf->cell(115, 10, $pdf->encodeString($staff['nombre_completo']), 1, 0, 'C');
        $pdf->cell(50, 10, $pdf->encodeString($staff['categoria']), 1, 1, 'C');
    }
} else {
    // Si no hay staffs registrados
    $pdf->cell(200, 10, $pdf->encodeString('No hay staffs registrados'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'staffs.pdf');
?>