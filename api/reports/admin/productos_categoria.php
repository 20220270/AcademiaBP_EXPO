<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idCategoriaProducto'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/categoriasproductos_data.php');
    require_once('../../models/data/productos_data.php');
    // Se instancian las entidades correspondientes.
    $categoria = new CategoriaProductosData;
    $producto = new ProductoData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($categoria->setId($_GET['idCategoriaProducto']) && $producto->setCategoria($_GET['idCategoriaProducto'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowCategoria = $categoria->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Productos de la categoría ' . $rowCategoria['categoria_producto']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosCategoria()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 9);
                $pdf->setTextColor(255, 255, 255);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(51, 10, 'Nombre del producto', 1, 0, 'C', 1);
                $pdf->cell(18, 10, 'Talla', 1, 0, 'C', 1);
                $pdf->cell(25, 10, 'Color', 1, 0, 'C', 1);
                $pdf->cell(23, 10, 'Precio', 1, 0, 'C', 1);
                $pdf->cell(23, 10, 'Existencias', 1, 0, 'C', 1);
                $pdf->cell(25, 10, 'Descuento', 1, 0, 'C', 1);
                $pdf->cell(25, 10, 'Estado', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 9);
                $pdf->setTextColor(0, 0, 0);
                // Se recorren los registros fila por fila.
                foreach ($dataProductos as $rowProducto) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(51, 10, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0, 'C');
                    $pdf->cell(18, 10, $rowProducto['talla'], 1, 0, 'C');

                    // Convertir el color hexadecimal a RGB
                    list($r, $g, $b) = sscanf($rowProducto['color'], "%02x%02x%02x");

                    // Guardar la posición actual
                    $x = $pdf->getX();
                    $y = $pdf->getY();

                    // Dibujar la celda de color con un margen
                    $pdf->setFillColor($r, $g, $b);
                    $pdf->rect($x + 2, $y + 2, 21, 6, 'F'); // Ajustar posición y tamaño para margen
                    $pdf->cell(25, 10, '', 1, 0, 'C');

                    // Restaurar la posición y el color de relleno por defecto
                    $pdf->setFillColor(255, 255, 255);
                    $pdf->setXY($x + 25, $y);

                    // Continuar con las demás celdas
                    $pdf->cell(23, 10, '$' . $rowProducto['precio_producto'], 1, 0, 'C');
                    $pdf->cell(23, 10, $rowProducto['existencias_producto'], 1, 0, 'C');
                    $pdf->cell(25, 10, $rowProducto['descuento_producto'] . '%', 1, 0, 'C');
                    $pdf->cell(25, 10, $rowProducto['estado_producto'], 1, 1, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay productos para la categoría'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'categoria.pdf');
        } else {
            print('Categoría inexistente');
        }
    } else {
        print('Categoría incorrecta');
    }
} else {
    print('Debe seleccionar una categoría');
}
?>
