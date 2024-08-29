<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/productos_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Proyección de productos más vendidos');
// Se instancia el módelo Categoría para obtener los datos.
$producto = new ProductoData;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductos = $producto->reportPredictionsProducts()) {
    
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(64, 136, 64);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 10);
    $pdf->setTextColor(255, 255, 255);
    $pdf->cell(185, 8, $pdf->encodeString('Los 7 productos con mejor proyección de ventas'), 1, 1, 'C', 1);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(70, 10, 'Imagen y producto', 1, 0, 'C', 1);
    $pdf->cell(55, 10, $pdf->encodeString('Promedio de ventas'), 1, 0, 'C', 1);
    $pdf->cell(60, 10, $pdf->encodeString('Proyección de ventas'), 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(240);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 7);
    $pdf->setTextColor(0, 0, 0);

        // Tamaño de la celda y de la imagen.
        $cellWidth = 25;
        $cellHeight = 20;
        $imgWidth = 14;
        $imgHeight = 14;

    foreach ($dataProductos as $rowProducto) {
        
        // Agregamos la imagen desde la ruta especificada.
        $imgPath = "../../images/productos/" . $rowProducto['imagen_producto'];
        if (file_exists($imgPath)) {
            // Calculamos la posición para centrar la imagen dentro de la celda.
            $xPos = $pdf->GetX() + ($cellWidth - $imgWidth) / 2;
            $yPos = $pdf->GetY() + ($cellHeight - $imgHeight) / 2;
            $pdf->cell($cellWidth, $cellHeight, '', 1, 0, 'C'); // Celda vacía con borde.
            $pdf->Image($imgPath, $xPos, $yPos, $imgWidth, $imgHeight); // Imagen centrada dentro de la celda.
        } else {
            $pdf->cell($cellWidth, $cellHeight, 'Sin foto', 1, 0, 'C');
        }
        $pdf->cell(45, $cellHeight, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0, 'C');
        $pdf->cell(55, $cellHeight, $pdf->encodeString( $rowProducto['ventas_totales']), 1, 0, 'C');
        $pdf->cell(60, $cellHeight, $pdf->encodeString( $rowProducto['proyeccion_proximo_año']), 1, 1, 'C');
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay productos para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'productos.pdf');
