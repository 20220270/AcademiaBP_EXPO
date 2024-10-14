<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idCompra'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/compras_data.php');
    // Se instancian las entidades correspondientes.
    $ordenes = new ComprasData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($ordenes->setIdOrden($_GET['idCompra'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowOrdenes = $ordenes->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Productos de la compra ' . $rowOrdenes['id_compra']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataOrdenes = $ordenes->readDetails()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);
                $pdf->setTextColor(255, 255, 255);

                $totalCompra = 0;

                $pdf->cell(0, 10, $pdf->encodeString('Cliente: ' . $rowOrdenes['nombre_completo']), 1, 1, 'L', 1);
                $pdf->cell(0, 10, $pdf->encodeString('Dirección: ' . $rowOrdenes['direccion_compra']), 1, 1, 'L', 1);
                $pdf->cell(0, 10, $pdf->encodeString('Fecha de la compra: ' . $rowOrdenes['fecha_registro']), 1, 1, 'L', 1);
                $pdf->cell(0, 10, $pdf->encodeString('Estado de la orden: ' . $rowOrdenes['estado_compra']), 1, 1, 'R', 1);
                $pdf->cell(0, 10, $pdf->encodeString('Método de pago: ' . $rowOrdenes['nombre_metodo']), 1, 1, 'L', 1);
                $pdf->Ln();

                // Se imprimen las celdas con los encabezados.
                $pdf->cell(70, 10, 'Productos', 1, 0, 'C', 1);
                $pdf->cell(25.9, 10, 'Cantidad', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Precio', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Descuento', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'SubTotal', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 11);
                $pdf->setTextColor(0, 0, 0);
                // Se recorren los registros fila por fila.
                foreach ($dataOrdenes as $rowProducto) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(70, 10, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0, 'C');
                    $pdf->cell(25.9, 10, $rowProducto['cantidad_producto'], 1, 0, 'C');
                    $pdf->cell(30, 10, '$' . $rowProducto['precio_producto'], 1, 0, 'C');
                    $pdf->cell(30, 10, $rowProducto['descuento_producto'] . '%', 1, 0, 'C');
                    $pdf->cell(30, 10, '$' . $rowProducto['SubtotalConDescuento'], 1, 1, 'C');

                    $totalCompra += $rowProducto['SubtotalConDescuento'];
                }
                $pdf->setFont('Arial', 'B', 11);
                $pdf->setTextColor(255, 255, 255);
                $pdf->cell(156, 10, 'Total de la compra: ', 1, 0, 'L', 1);
                $pdf->cell(30, 10, '$' . number_format($totalCompra, 2, '.', ''), 1, 1, 'C', 1);
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay productos para la compra'), 1, 0);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'ordenes.pdf');
        } else {
            print('Compra inexistente');
        }
    } else {
        print('Compra incorrecta');
    }
} else {
    print('Debe seleccionar una compra');
}
