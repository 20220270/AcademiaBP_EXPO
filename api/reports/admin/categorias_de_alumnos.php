<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
//Reporte para todas las categorías de alumnos registradas

$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idCategoriaProducto'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/categoriasalumnos_data.php');
    require_once('../../models/data/nivelesentrenamiento_data.php');
    // Se instancian las entidades correspondientes.
    $categoria = new CategoriasAlunmosData;
    $producto = new NivelesEntrenamientoData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($categoria->setIdCategoria($_GET['id_categoria_alumno']) && $producto->setId($_GET['id_nivel_entrenamiento'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowCategoria = $categoria->readOneAlumno()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Categorias por nivel:' . $rowCategoria['nivel_entrenamiento']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataCategoria = $categoria->readAllCategoriasReport()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 9);
                $pdf->setTextColor(255, 255, 255);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(51, 10, 'Nombre del producto', 1, 0, 'C', 1);
                $pdf->cell(20, 10, 'Edad maxima', 1, 0, 'C', 1);
                $pdf->cell(25, 10, 'Nivel de entrenamiento', 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Descripcion', 1, 0, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 10);
                $pdf->setTextColor(0, 0, 0);
                // Se recorren los registros fila por fila.
                foreach ($dataNiveles as $rowNivel) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(51, 10, $pdf->encodeString($rowNivel['categoria']), 1, 0, 'C');
                    $pdf->cell(20, 10, $rowNivel['edad_maxima'], 1, 0, 'C');
                    $pdf->cell(30, 10, '$' . $rowNivel['nivel_entrenamiento'], 1, 0, 'C');
                    $pdf->cell(30, 10, $rowNivel['descripcion_nivel'] . '%', 1, 0, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay Categorias por nivel'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'Categoria nivel.pdf');
        } else {
            print('Categoría inexistente');
        }
    } else {
        print('Categoría incorrecta');
    }
} else {
    print('Debe seleccionar una categoría');
}
