<?php
// Se incluye la clase para generar archivos PDF.
require_once('../../libraries/fpdf185/fpdf.php');

/*
*   Clase para definir las plantillas de los reportes del sitio privado.
*   Para más información http://www.fpdf.org/
*/
class Report extends FPDF
{
    // Constante para definir la ruta de las vistas del sitio privado.
    const CLIENT_URL = 'http://localhost/AcademiaBP_EXPO/views/admin/';

    // Constante para definir la ruta de las vistas del sitio público.
    const CLIENT_URL2 = 'http://localhost/AcademiaBP_EXPO/views/public/';
    // Propiedad para guardar el título del reporte.
    private $title = null;

    // Propiedad para indicar si el reporte es del tipo Boleta.
    private $isBoleta = false;

    /*
    *   Método para iniciar el reporte con el encabezado del documento.
    *   Parámetros: $title (título del reporte).
    *   Retorno: ninguno.
    */
    public function startReport($title)
    {
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        session_start();
        // Se verifica si un administrador ha iniciado sesión para generar el documento, de lo contrario se direcciona a la página web principal.
        if (isset($_SESSION['aliasAdministrador'])) {

            $nombreAdministrador = $_SESSION['aliasAdministrador'] ?? 'Usuario';
            // Se asigna el título del documento a la propiedad de la clase.
            $this->title = $title;
            // Se establece el título del documento (true = utf-8).
            $this->setTitle('AcademiaBP - Reporte', true);
            // Se establecen los márgenes del documento (izquierdo, superior y derecho).
            $this->setMargins(15, 15, 15);
            // Se añade una nueva página al documento con orientación vertical y formato carta, llamando implícitamente al método header()
            $this->addPage('p', 'letter');
            $this->Cell(0, 10, 'Reporte generado por: ' . $nombreAdministrador, 0, 1, 'R');
            // Se define un alias para el número total de páginas que se muestra en el pie del documento.
            $this->aliasNbPages();
        } else {
            header('location:' . self::CLIENT_URL);
        }
    }

    

    /*
    *   Método para iniciar un reporte desde la vista del cliente.
    *   Parámetros: $title (título del reporte).
    *   Retorno: ninguno.
    */
    public function startReportClient($title)
    {
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        session_start();
        // Se verifica si un cliente ha iniciado sesión para generar el documento, de lo contrario se direcciona a la página web principal.
        if (isset($_SESSION['idCliente'])) {
            // Se asigna el título del documento a la propiedad de la clase.
            $this->title = $title;
            // Se establece el título del documento (true = utf-8).
            $this->setTitle('AcademiaBP - Reporte', true);
            // Se establecen los márgenes del documento (izquierdo, superior y derecho).
            $this->setMargins(15, 15, 15);
            // Se añade una nueva página al documento con orientación vertical y formato carta, llamando implícitamente al método header()
            $this->addPage('p', 'letter');
            // Se define un alias para el número total de páginas que se muestra en el pie del documento.
            $this->aliasNbPages();
        } else {
            header('location:' . self::CLIENT_URL2);
        }
    }

    /*
    *   Método para iniciar un reporte horizontal.
    *   Parámetros: $title (título del reporte).
    *   Retorno: ninguno.
    */
    public function startReportHorizontal($title)
    {
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        session_start();
        // Se verifica si un administrador ha iniciado sesión para generar el documento, de lo contrario se direcciona a la página web principal.
        if (isset($_SESSION['aliasAdministrador'])) {

            $nombreAdministrador = $_SESSION['aliasAdministrador'] ?? 'Administrador'; //Traemos el alias del usuario que ha generado el reporte. Lo traemos de las variables de sesión que se crean al iniciar sesión
            // Se asigna el título del documento a la propiedad de la clase.
            $this->title = $title;
            // Se establece el título del documento (true = utf-8).
            $this->setTitle('AcademiaBP - Reporte', true);
            // Se establecen los márgenes del documento (izquierdo, superior y derecho).
            $this->setMargins(15, 15, 15);
            // Se añade una nueva página al documento con orientación horizontal y formato carta, llamando implícitamente al método header()
            $this->addPage('l', 'letter');
            $this->Cell(0, 10, 'Reporte generado por: ' . $nombreAdministrador, 0, 1, 'R'); //Mostramos el usuario que ha generado el reporte
            // Se define un alias para el número total de páginas que se muestra en el pie del documento.
            $this->aliasNbPages();
        } else {
            header('location:' . self::CLIENT_URL);
        }
    }

    /*
    *   Método para iniciar un reporte tipo Boleta con un encabezado personalizado.
    *   Parámetros: $title (título del reporte).
    *   Retorno: ninguno.
    */
    public function startReportBoleta($title)
    {
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        session_start();
        // Se verifica si un administrador ha iniciado sesión para generar el documento, de lo contrario se direcciona a la página web principal.
        if (isset($_SESSION['aliasAdministrador'])) {
            // Se asigna el título del documento a la propiedad de la clase.
            $this->title = $title;
            // Se establece el indicador de que es un reporte tipo Boleta.
            $this->isBoleta = true;
            // Se establece el título del documento (true = utf-8).
            $this->setTitle('AcademiaBP - Boleta', true);
            // Se establecen los márgenes del documento (izquierdo, superior y derecho).
            $this->setMargins(15, 15, 15);
            // Se añade una nueva página al documento con orientación horizontal y formato de página personalizado, llamando implícitamente al método header()
            $this->addPage('l', array(230, 230));
            // Se define un alias para el número total de páginas que se muestra en el pie del documento.
            $this->aliasNbPages();
        } else {
            header('location:' . self::CLIENT_URL2);
        }
    }

    /*
    *   Método para codificar una cadena de alfabeto español a UTF-8.
    *   Parámetros: $string (cadena).
    *   Retorno: cadena convertida.
    */
    public function encodeString($string)
    {
        return mb_convert_encoding($string, 'ISO-8859-1', 'utf-8');
    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del encabezado de los reportes.
    *   Se llama automáticamente en el método addPage()
    */
    public function header()
{
    if ($this->isBoleta) {
        // Se obtiene el ancho actual de la página.
        $pageWidth = $this->getPageWidth() - 50;
        // Se establece el logo.
        $this->image('../../images/logoAcademiaBP.png', 15, 30, 20); // Imagen personalizada
        // Se ubica el título.
        $this->cell(20);
        $this->setFont('Arial', '', 10);
        $this->cell($pageWidth, 10, 'Fecha/Hora: ' . date('d-m-Y H:i:s'), 0, 1, 'R');
        $this->setFont('Arial', 'B', 30);
        $this->cell(185, 30, $this->encodeString($this->title), 0, 1, 'C');
        // Coloca la misma imagen del logo debajo del título con un tamaño más pequeño.
        $this->image('../../images/whatsapp.jpg', 80, 50, 10);
        $this->image('../../images/logoFacebook.png', 81, 65, 8);
        // Texto a la par de la imagen de logoAcademiaBP
        $this->setXY(93, 50); // Posiciona el cursor a la derecha de la imagen
        $this->setFont('Arial', '', 12);
        $this->cell(0, 10, $this->encodeString('Teléfono: 7303-5707'), 0, 1, 'L');
        // Texto a la par de la imagen de logoFacebook
        $this->setXY(93, 65); // Posiciona el cursor a la derecha de la imagen
        $this->setFont('Arial', '', 12);
        $this->cell(0, 10, $this->encodeString('La Academia BP'), 0, 1, 'L');
        // Se agrega un salto de línea para mostrar el contenido principal del documento.
        $this->ln(1); // Aumentamos el espacio a 40 para que la imagen no interfiera con el contenido
    }
    
     else {
        // Se obtiene el ancho actual de la página.
        $pageWidth = $this->getPageWidth() - 30; // Resta los márgenes (15+15)
        // Se establece el logo.
        $this->image('../../images/logoAcademiaBP.png', 15, 15, 20);
        // Se ubica el título.
        $this->cell(20);
        $this->setFont('Arial', 'B', 15);
        $this->cell($pageWidth, 10, $this->encodeString($this->title), 0, 1, 'C');
        // Se ubica la fecha y hora del servidor.
        $this->cell(20);
        $this->setFont('Arial', '', 10);
        $this->cell($pageWidth, 10, 'Fecha/Hora: ' . date('d-m-Y H:i:s'), 0, 1, 'C');
        // Se agrega un salto de línea para mostrar el contenido principal del documento.
        $this->ln(10);
    }
}


    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del pie de página de los reportes.
    *   Se llama automáticamente en el método addPage()
    */
    public function footer()
    {
        // Se establece la posición para el número de página (a 15 milímetros del final).
        $this->setY(-15);
        $this->setFont('Arial', 'I', 8);
        // Se imprime una celda con el número de página.
        $this->cell(0, 10, $this->encodeString('Página ') . $this->pageNo() . '/{nb}', 0, 0, 'C');
    }
}
