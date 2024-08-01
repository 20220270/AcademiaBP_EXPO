<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once ('../../helpers/report.php');
// Se incluyen las clases para el acceso a datos de staffs.
require_once ('../../models/data/staff_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('staffs Registrados');


// Se instancia el modelo staff para obtener los datos.
$staffModel = new StaffData;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataStaff = $staffModel->readAllReport()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(13, 92, 49);
    $pdf->setTextColor(255, 255, 255);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 8);

    // Encabezados
    $pdf->cell(10, 10, 'ID', 1, 0, 'C', 1);
    $pdf->cell(25, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(25, 10, 'Apellido', 1, 0, 'C', 1);
    $pdf->cell(130, 10, 'Descripcion', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los staffs.
    $pdf->setFont('Arial', '', 8);

    // Recorremos los datos de los staffs
    foreach ($dataStaff as $staff) {
        $pdf->setTextColor(0, 0, 0);
        // ID del staff
        $pdf->cell(10, 10, $staff['id_staff'], 1, 0, 'C');

        // Nombre
        $pdf->cell(25, 10, $pdf->encodeString($staff['nombre_staff']), 1, 0, 'C');

        // Apellido
        $pdf->cell(25, 10, $pdf->encodeString($staff['apellido_staff']), 1, 0, 'C');

        // Correo
        $pdf->cell(130, 10, $pdf->encodeString($staff['descripcion_extra']), 1, 1, 'C');
    }
} else {
    // Si no hay staffs registrados
    $pdf->cell(200, 10, $pdf->encodeString('No hay staffs registrados'), 1, 1, 'C');
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'staffs.pdf');
?>