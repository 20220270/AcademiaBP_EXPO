<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/categoriasalumnos_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Categorías registradas');
// Se instancia el módelo Categoría para obtener los datos.
$categorias = new CategoriasAlumnosHandler;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataCategorias = $categorias->readAllCategoriasReport()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(64, 136, 64);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    $pdf->setTextColor(255, 255, 255);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(50, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Rango de edades', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Nivel', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Horario de entrenamiento', 1, 0, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(240);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 11);
    $pdf->setTextColor(0, 0, 0);

    foreach ($dataCategorias as $rowCategoriaa) {
        
        // Se imprimen las celdas con los datos de los productos.
        $pdf->cell(50, 10, $pdf->encodeString( $rowCategoriaa['categoria']), 1, 0, 'C');
        $pdf->cell(30, 10, $rowCategoriaa['rango_edades'] . ' años', 1, 0, 'C');
        $pdf->cell(30, 10, $pdf->encodeString( $rowCategoriaa['nivel_entrenamiento']) . '%', 1, 0, 'C');
        $pdf->cell(30, 10, $rowCategoriaa['id_horario_lugar'], 1, 0, 'C');
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay productos para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'productos.pdf');
