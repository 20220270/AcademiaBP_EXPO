<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/pagosmensualidad_data.php');
// Se instancian las entidades correspondientes.
$pagosmensualidad = new PagosMensualidadData;

//Ahora, vamos a realizar condiciones, dependiendo el valor que se envíe para el reporte

// Se verifica si existe un valor para la fecha específica, de lo contrario se muestra un mensaje.
if (isset($_GET['fechaEspecifica'])) {

    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($pagosmensualidad->setFechaPago($_GET['fechaEspecifica'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowpagos = $pagosmensualidad->readOne2()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Pagos de mensualidad de la fecha ' . $rowpagos['fecha_pago']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($datapago = $pagosmensualidad->reportPagos()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 9);
                $pdf->setTextColor(255, 255, 255);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(60, 10, 'Nombre del alumno', 1, 0, 'C', 1);
                $pdf->cell(60, 10, 'Nombre del responsable', 1, 0, 'C', 1);
                $pdf->cell(25, 10, 'Total pagado', 1, 0, 'C', 1);
                $pdf->cell(40, 10, 'Fecha del pago', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 7);
                $pdf->setTextColor(0, 0, 0);

                // Se recorren los registros fila por fila.
                foreach ($datapago as $rowpagos) {


                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(60, 10, $pdf->encodeString($rowpagos['Nombre']), 1, 0, 'C');
                    $pdf->cell(60, 10, $pdf->encodeString($rowpagos['NombreCliente']), 1, 0, 'C');
                    $pdf->cell(25, 10, $pdf->encodeString('$' . $rowpagos['mensualidad_pagar']), 1, 0, 'C');
                    $pdf->cell(40, 10, $pdf->encodeString($rowpagos['fecha_pago']), 1, 1, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay pagos en la fecha seleccionada') . $pdf->encodeString($rowcategoria['categoria']), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'pagosmensualidad.pdf');
        } else {
            print('Fecha inexistente');
        }
    } else {
        print('Fecha incorrecta');
    }
}
//Ahora, en caso de que no se haya mandado el valor de la fecha específica, se verifica si se mandó una fecha en formato YYYY-MM
else if (isset($_GET['fechaMesAnio'])) {
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($pagosmensualidad->setFechaPago($_GET['fechaMesAnio'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowpagos = $pagosmensualidad->readOne3()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Pagos de mensualidad de la fecha ' . $rowpagos['mesanio']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($datapago = $pagosmensualidad->reportPagosMesAnio()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 9);
                $pdf->setTextColor(255, 255, 255);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(60, 10, 'Nombre del alumno', 1, 0, 'C', 1);
                $pdf->cell(60, 10, 'Nombre del responsable', 1, 0, 'C', 1);
                $pdf->cell(25, 10, 'Total pagado', 1, 0, 'C', 1);
                $pdf->cell(40, 10, 'Fecha del pago', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 7);
                $pdf->setTextColor(0, 0, 0);

                // Se recorren los registros fila por fila.
                foreach ($datapago as $rowpagos) {


                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(60, 10, $pdf->encodeString($rowpagos['Nombre']), 1, 0, 'C');
                    $pdf->cell(60, 10, $pdf->encodeString($rowpagos['NombreCliente']), 1, 0, 'C');
                    $pdf->cell(25, 10, $pdf->encodeString('$' . $rowpagos['mensualidad_pagar']), 1, 0, 'C');
                    $pdf->cell(40, 10, $pdf->encodeString($rowpagos['fecha_pago']), 1, 1, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay pagos en la fecha seleccionada') . $pdf->encodeString($rowcategoria['categoria']), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'pagosmensualidad.pdf');
        } else {
            print('Fecha mes y año inexistente');
        }
    } else {
        print('Fecha incorrecta');
    }
} else {
    print('Debe seleccionar una fecha');
}
