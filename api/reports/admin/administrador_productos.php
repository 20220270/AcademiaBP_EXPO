<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idAdministrador'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/administradores_data.php');
    require_once('../../models/data/productos_data.php');
    // Se instancian las entidades correspondientes.
    $administrador = new AdministradorData;
    $producto = new ProductoData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($administrador->setId($_GET['idAdministrador']) && $producto->setIdAdmin($_GET['idAdministrador'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowAdmin = $administrador->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Productos registrados por el administrador seleccionado');
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosAdministradores()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 11);
                $pdf->setTextColor(255, 255, 255);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(85, 10, 'Nombre del producto', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Precio', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Estado', 1, 0, 'C', 1);
                $pdf->cell(40, 10, 'Fecha de registro', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 11);
                $pdf->setTextColor(0, 0, 0);
                // Se recorren los registros fila por fila.
                foreach ($dataProductos as $rowProducto) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(85, 10, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0, 'C');
                    $pdf->cell(30, 10, '$' . $rowProducto['precio_producto'], 1, 0, 'C');
                    $pdf->cell(30, 10, $rowProducto['estado_producto'], 1, 0, 'C');
                    $pdf->cell(40, 10, $rowProducto['fecha_registro'], 1, 1, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay productos registrados por el administrador seleccionado'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'categoria.pdf');
        } else {
            print('Administrador inexistente');
        }
    } else {
        print('Administrador incorrecta');
    }
} else {
    print('Debe seleccionar un Administrador');
}
