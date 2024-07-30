<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idStaff'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/staff_data.php');
    require_once('../../models/data/alumnos_data.php');
    // Se instancian las entidades correspondientes.
    $staff = new StaffData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($staff->setId($_GET['idStaff'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowStaff = $staff->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Alumnos a cargo de ' . $rowStaff['nombre_staff']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataAlumnos = $staff->readAllAlumnosStaff()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 9);
                $pdf->setTextColor(255, 255, 255);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(0, 10, 'Nombre del alumno', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 10);
                $pdf->setTextColor(0, 0, 0);
                // Se recorren los registros fila por fila.
                foreach ($dataAlumnos as $rowAlumnos) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(0, 10, $pdf->encodeString($rowAlumnos['nombre_alumnos']), 1, 1, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay alumnos a cargo del personal seleccionado'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'alumnos_staff.pdf');
        } else {
            print('Staff inexistente');
        }
    } else {
        print('Staff incorrecto');
    }
} else {
    print('Debe seleccionar un miembro del staff');
}
?>
