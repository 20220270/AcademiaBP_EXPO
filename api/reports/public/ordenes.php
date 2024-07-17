<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.

require_once('../../models/data/ordenes_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

if (isset($_GET['idOrden'])) {
    // Se inicia el reporte con el encabezado del documento.
    $pdf->startReportClient('Detalle de compra');
    // Se instancia el módelo Ordenes para obtener los datos.
    $ordenes = new OrdenesData;

    if ($ordenes->setIdOrden($_GET['idOrden'])) {
        // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
        if ($dataOrdenes = $ordenes->myOrdersReport()) {
            // Se establece un color de relleno para los encabezados.
            $pdf->setFillColor(132, 6, 6);
            // Se establece la fuente para los encabezados.
            $pdf->setFont('Arial', 'B', 11);
            $pdf->setTextColor(255, 255, 255);

            //Establecemos la variable para el total de la compra
            $totalCompra = 0;
            
            //Explicación de cada parte de cell
            
            /*Ancho de la celda, Alto de la celda, Contenido de la celda (en este caso, se coloca la posición 0 para obtener únicamente el primer registro), 
            Definimos si llevará borde o no llevará (0 no lleva, 1 si lleva),
            Definimos si lleva o no Salto de linea, Alineación del contenido, Si la fila llevará relleno o no*/

            $pdf->cell(0, 10, $pdf->encodeString('Orden número: ' . $dataOrdenes[0]['id_orden']), 1, 1, 'L', 1);
            $pdf->cell(0, 10, $pdf->encodeString('Cliente: ' . $dataOrdenes[0]['Cliente']), 1, 1, 'L', 1);
            $pdf->cell(0, 10, $pdf->encodeString('Fecha de la compra: ' . $dataOrdenes[0]['fecha_registro']), 1, 1, 'R', 1);

            //Salto de linea para separar los datos de la compra y los datos del producto
            $pdf->Ln();

            $pdf->setFont('Arial', 'B', 11);
            $pdf->setTextColor(255, 255, 255);
            $pdf->setFillColor(110, 6, 6);

            // Se imprimen las celdas con los encabezados.
            $pdf->cell(63, 10, 'Productos', 1, 0, 'C', 1);
            $pdf->cell(30, 10, 'Precio', 1, 0, 'C', 1);
            $pdf->cell(30, 10, 'Cantidad', 1, 0, 'C', 1);
            $pdf->cell(30, 10, 'Descuento', 1, 0, 'C', 1);
            $pdf->cell(33, 10, 'Sub Total', 1, 1, 'C', 1);

            // Se establece un color de relleno para mostrar el nombre de la categoría.
            
            // Se establece la fuente para los datos de los productos.
            $pdf->setFont('Arial', '', 11);
            $pdf->setTextColor(0, 0, 0);

            // Se recorren los registros fila por fila.
            foreach ($dataOrdenes as $rowOrdenes) {

                // Se imprimen las celdas con los datos de los productos.
                $pdf->cell(63, 10, $pdf->encodeString($rowOrdenes['nombre_producto']), 1, 0, 'C');
                $pdf->cell(30, 10, '$' . $rowOrdenes['precio_producto'], 1, 0, 'C');
                $pdf->cell(30, 10, $rowOrdenes['cantidad_producto'], 1, 0, 'C');
                $pdf->cell(30, 10, $rowOrdenes['descuento_producto' ] . '%', 1, 0, 'C');
                $pdf->cell(33, 10, '$' . $rowOrdenes['SubtotalConDescuento' ], 1, 1, 'C');

                //Sumamos todos los datos de SubTotalConDescuento para obtener el total de la compra
                $totalCompra += $rowOrdenes['SubtotalConDescuento'];
            }

            $pdf->setFont('Arial', 'B', 11);
            $pdf->setTextColor(255, 255, 255);
            $pdf->setFillColor(110, 6, 6);
            //Obtendremos el total de la compra
            //Le damos un formato de dólar y redondeado a dos cifras decimales
            $pdf->cell(153, 10, 'Total de la compra: ', 1, 0, 'L', 1);
            $pdf->cell(33, 10, '$' . number_format($totalCompra, 2, '.', ''), 1, 1, 'C', 1);


        } else {
            $pdf->cell(0, 10, $pdf->encodeString('No hay ordenes para mostrar'), 1, 1);
        }
    } else {
        $pdf->cell(0, 10, $pdf->encodeString('Orden incorrecta'), 1, 1);
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('Debe seleccionar una orden'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'ordenes.pdf');
