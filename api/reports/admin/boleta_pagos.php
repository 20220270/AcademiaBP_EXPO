<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/pagosmensualidad_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

if (isset($_GET['idPagoARealizar'])) {
    // Se inicia el reporte con el encabezado del documento.
    $pdf->startReportBoleta('La Academia BP');
    
    // Se instancia el módelo Ordenes para obtener los datos.
    $boleta = new PagosMensualidadData;

    if ($boleta->setIdPago($_GET['idPagoARealizar'])) {
        // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
        if ($dataBoleta = $boleta->readBoletaPagos()) {
            // Se establece un color de relleno para los encabezados.
            $pdf->setFillColor(255, 255, 255);
            // Se establece la fuente para los encabezados.
            $pdf->setFont('Arial', 'B', 11);
            $pdf->setTextColor(0, 0, 0);

            // Se agrega el primer campo con borde inferior
            $pdf->cell(0, 20, $pdf->encodeString('Pago N°: ' . $dataBoleta[0]['id_pago']), 0, 1, 'R', 1);

            // Celda con borde inferior para la fecha de pago
            $pdf->cell(90, 20, $pdf->encodeString('Fecha de pago: ' . $dataBoleta[0]['fecha_pago']), 'B', 0, 'L', 1);

            // Añadir un espacio de 5 unidades de alto para separar las celdas
            $pdf->cell(20, 5, '', 0, 0, 'L', 1);

            // Celda con borde inferior para el valor y días
            $pdf->cell(90, 20, $pdf->encodeString('Valor $: ' . $dataBoleta[0]['mensualidad_pagar'] . ' - ' . $dataBoleta[0]['numero_dias'] . ' días'), 'B', 1, 'L', 1);

            // Se continúan agregando las celdas restantes
            $pdf->cell(0, 20, $pdf->encodeString('Alumno: ' . $dataBoleta[0]['nombre'] . ' - Categoría ' . $dataBoleta[0]['categoria']), 'B', 1, 'L', 1);
            $pdf->cell(0, 20, $pdf->encodeString('Concepto: ' . $dataBoleta[0]['descripcion_pago']), 'B', 1, 'L', 1);
            $pdf->cell(0, 20, $pdf->encodeString('Próximo pago: ' . $dataBoleta[0]['fecha_proximo_pago']), 'B', 1, 'L', 1);

        } else {
            $pdf->cell(0, 10, $pdf->encodeString('No hay datos para la boleta'), 1, 1);
        }
    } else {
        $pdf->cell(0, 10, $pdf->encodeString('Pago incorrecto'), 1, 1);
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('Debe seleccionar un pago para realizar la boleta'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'compras.pdf');
