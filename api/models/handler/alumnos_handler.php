<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class AlumnosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $fechanacimiento = null;
    protected $posicion = null;
    protected $idstaffcategoria = null;
    protected $ididaspago = null;
    protected $estado = null;
    protected $idcliente = null;
    protected $foto = null;
    protected $fechainscripcion = null;
    protected $idalumnoscategoria = null;

    const RUTA_IMAGEN = '../../images/alumnos/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad, foto_alumno, fecha_nacimiento, posicion_alumno, estado_alumno, fecha_inscripcion,
        CONCAT(nombre_cliente, ' ', apellido_cliente) as 'Encargado' FROM tb_alumnos
        LEFT JOIN tb_dias_pagos USING (id_dia_pago)
        LEFT JOIN tb_clientes using(id_cliente)
        WHERE CONCAT(nombre_alumno, ' ' ,apellido_alumno) LIKE ?  OR numero_dias LIKE ? OR estado_alumno LIKE ? OR fecha_inscripcion LIKE ? OR posicion_alumno LIKE ?
        ORDER BY estado_alumno";
        $params = array($value, $value, $value, $value , $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        // Llamada al procedimiento almacenado
        $sql = 'CALL sp_insert_alumno(?, ?, ?, ?, ?, ?, ?)';

        $params = array($this->nombre, $this->apellido, $this->fechanacimiento, $this->posicion, $this->ididaspago, $this->idcliente, $this->foto);
        return Database::executeRow($sql, $params);
    }

    //Definimos todos los diferentes filtros para mostrar alumnos

    //Mostrar todos los alumnos
    public function readAll()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    ORDER BY 
    id_alumno;";
        return Database::getRows($sql);
    }

    //Reporte
    public function readAllReport()
    {
        $sql = "SELECT 
    id_alumno, 
    CONCAT(nombre_alumno, ' ', apellido_alumno) AS nombre, 
    fecha_nacimiento, 
    foto_alumno, 
    fecha_inscripcion,
    TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad,
    posicion_alumno, 
    estado_alumno, 
    GROUP_CONCAT(DISTINCT categoria ORDER BY categoria SEPARATOR ', ') AS categoria,
   numero_dias, 
    mensualidad_pagar,
    CONCAT(nombre_cliente, ' ', apellido_cliente) AS Encargado
    FROM 
    tb_alumnos_categorias
    LEFT JOIN tb_alumnos USING (id_alumno)
    LEFT JOIN tb_staffs_categorias USING (id_staff_categorias)
    LEFT JOIN tb_categorias_horarios USING (id_categoria_horario)
    LEFT JOIN tb_categorias_alumnos USING (id_categoria_alumno)
    LEFT JOIN tb_staffs USING (id_staff)
    LEFT JOIN tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN tb_clientes USING (id_cliente)
    WHERE 
    estado_alumno = 'Activo' OR estado_alumno = 'Inactivo'
    GROUP BY 
    id_alumno, nombre, fecha_nacimiento, foto_alumno, fecha_inscripcion, edad, posicion_alumno, estado_alumno
    ORDER BY 
    id_alumno;";
        return Database::getRows($sql);
    }

    public function readDatosAlumno()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, fecha_nacimiento, foto_alumno, fecha_inscripcion,
    TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad,
    posicion_alumno, 
    estado_alumno, 
    numero_dias, 
    mensualidad_pagar,
    CONCAT(nombre_cliente, ' ', apellido_cliente) AS 'Encargado' 
    FROM 
    tb_alumnos 
    LEFT JOIN tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE id_alumno = ?;";
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }
    

    //Vistas para los alumnos
    //Mostrar los alumnos más recientes
    public function readAllAlumnosRecientes()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE estado_alumno = 'Activo' OR estado_alumno = 'Inactivo'
    ORDER BY 
    fecha_inscripcion DESC";
        return Database::getRows($sql);
    }

    //Mostrar los alumnos más antiguos
    public function readAllAlumnosAntiguos()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE estado_alumno = 'Activo' OR estado_alumno = 'Inactivo'
    ORDER BY 
    fecha_inscripcion ASC";
        return Database::getRows($sql);
    }

    //Mostrar los alumnos de mayor a menor según la edad
    public function readAllAlumnosMayorEdad()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE estado_alumno = 'Activo' OR estado_alumno = 'Inactivo'
    ORDER BY 
    TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) DESC";
        return Database::getRows($sql);
    }

    //Mostrar los alumnos de menor a mayor según la edad
    public function readAllAlumnosMenorEdad()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE estado_alumno = 'Activo' OR estado_alumno = 'Inactivo'
    ORDER BY 
    TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) ASC";
        return Database::getRows($sql);
    }

    //Ver alumnos que entrenan más días
    public function readAllAlumnosMasDias()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE estado_alumno = 'Activo' OR estado_alumno = 'Inactivo'
    ORDER BY numero_dias DESC";
        return Database::getRows($sql);
    }

    //Ver alumnos que entrenan menos días
    public function readAllAlumnosMenosDias()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE estado_alumno = 'Activo' OR estado_alumno = 'Inactivo'
    ORDER BY numero_dias ASC";
        return Database::getRows($sql);
    }

    //Ver jugadores de campos
    public function readAllAlumnosJugadoresCampo()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE posicion_alumno = 'Jugador de campo' AND (estado_alumno = 'Activo' OR estado_alumno = 'Inactivo'); ";
        return Database::getRows($sql);
    }

    //Ver porteros
    public function readAllAlumnosPorteros()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, foto_alumno, estado_alumno, fecha_nacimiento
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    WHERE posicion_alumno = 'Portero' AND (estado_alumno = 'Activo' OR estado_alumno = 'Inactivo');";
        return Database::getRows($sql);
    }

    //Fin de las vistas --------------------------------------

    public function readOne()
    {
        $sql = "SELECT id_alumno, nombre_alumno, apellido_alumno, fecha_nacimiento, posicion_alumno, id_dia_pago, estado_alumno, id_cliente, CONCAT(nombre_alumno, ' ', apellido_alumno) AS Nombre, fecha_inscripcion
        FROM tb_alumnos
        WHERE id_alumno = ?";
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_alumnos
                SET foto_Alumno = ?, nombre_alumno = ?, apellido_alumno = ?, fecha_nacimiento = ?, posicion_alumno = ?, id_dia_pago = ?, estado_alumno = ?, id_cliente = ?, fecha_inscripcion = ?
                WHERE id_alumno = ?';
        $params = array($this->foto, $this->nombre, $this->apellido, $this->fechanacimiento, $this->posicion, $this->ididaspago, $this->estado, $this->idcliente, $this->fechainscripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_alumnos
                WHERE id_alumno = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAllStaffCategorias()
    {
        $sql = "SELECT id_staff_categorias, CONCAT(nombre_staff, ' ', apellido_staff, ' - ' , categoria) AS 'nombre_categoria' FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING(id_staff)
                INNER JOIN tb_categorias_horarios USING(id_categoria_horario)
                INNER JOIN tb_categorias_alumnos USING(id_categoria_alumno);";
        return Database::getRows($sql);
    }

    //Se vincula a una vista creada en la base de datos
    public function readAllDiasPago()
    {
        $sql = "SELECT * FROM vista_dias_pago;";
        return Database::getRows($sql);
    }

    public function readAllDiasPago2()
    {
        $sql = "SELECT 
                id_dia_pago, 
                CONCAT(
                CASE 
                    WHEN numero_dias < 2 THEN CONCAT(numero_dias, ' Día') -- Cuando el valor de numero_dias es menor a 2 (es decir que es 1), el texto que sigue al número es Día
                    ELSE CONCAT(numero_dias, ' Días') -- Sino, el texto será Días 
                END, 
                ', $', mensualidad_pagar) AS dia_pago
                FROM tb_dias_pagos";
        return Database::getRows($sql);
    }

    //Gráfico para saber las categorías con más alumnos

    public function categoriasConMasAlumnos()
    {
        $sql = "SELECT 
                categoria,
                COUNT(id_alumno) AS cantidad_alumnos
                FROM 
                tb_alumnos_categorias
                JOIN 
                tb_alumnos USING(id_alumno)
                JOIN 
                tb_staffs_categorias USING(id_staff_categorias)
                JOIN 
                tb_categorias_horarios USING(id_categoria_horario)
                JOIN 
                tb_categorias_alumnos USING(id_categoria_alumno)
                GROUP BY 
                categoria
                ORDER BY 
                cantidad_alumnos DESC LIMIT 5";
        return Database::getRows($sql);
    }

    //Sitio publico

    public function createRowAlumno()
    {
        // Llamada al procedimiento almacenado
        $sql = 'CALL sp_insert_alumno(?, ?, ?, ?, ?, ?, ?)';

        $params = array($this->nombre, $this->apellido, $this->fechanacimiento, $this->posicion, $this->ididaspago, $_SESSION['idCliente'], $this->foto);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_alumno
                FROM tb_alumnos
                WHERE id_alumno = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }


    public function alumnosPredictGraph()
    {
        $sql = "SELECT 
        YEAR(fecha_inscripcion) AS anio,  -- Año de inscripción
        COUNT(*) AS total_inscripciones  -- Número total de inscripciones en ese año
    FROM tb_alumnos
    GROUP BY YEAR(fecha_inscripcion)  -- Agrupa por año
    ORDER BY anio;";

        return Database::getRows($sql);
    }

    public function alumnosPredictGraph2()
    {
        $sql = "SELECT 
    years.anio,  -- Año de inscripción
    months.mes,  -- Mes de inscripción
    IFNULL(inscripciones.total_inscripciones, 0) AS total_inscripciones  -- Total de inscripciones, o 0 si no hay datos
    FROM 
    -- Subconsulta para obtener todos los años distintos de las inscripciones
    (SELECT DISTINCT YEAR(fecha_inscripcion) AS anio FROM tb_alumnos) AS years
    CROSS JOIN 
    -- Subconsulta para generar todos los meses del año
    (SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION 
     SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION 
     SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS months
    LEFT JOIN 
    -- Subconsulta para contar las inscripciones por año y mes
    (SELECT 
        YEAR(fecha_inscripcion) AS anio,  -- Año de inscripción
        MONTH(fecha_inscripcion) AS mes,   -- Mes de inscripción
        COUNT(*) AS total_inscripciones    -- Total de inscripciones en ese año y mes
    FROM 
        tb_alumnos
        WHERE estado_alumno = 'Activo'
    GROUP BY 
        YEAR(fecha_inscripcion),  -- Agrupa por año
        MONTH(fecha_inscripcion)) AS inscripciones  -- Agrupa por mes
    ON 
    -- Une la tabla de años y meses con la tabla de inscripciones
    years.anio = inscripciones.anio AND months.mes = inscripciones.mes
    ORDER BY 
    years.anio,  -- Ordena por año
    months.mes;  -- Ordena por mes";

        return Database::getRows($sql);
    }

    public function alumnosPredictGraph3()
    {
        $sql = "WITH meses AS (
    SELECT 1 AS mes UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5 UNION ALL
    SELECT 6 UNION ALL
    SELECT 7 UNION ALL
    SELECT 8 UNION ALL
    SELECT 9 UNION ALL
    SELECT 10 UNION ALL
    SELECT 11 UNION ALL
    SELECT 12
),

-- Calcula la media mensual de inscripciones para cada mes en los años anteriores
promedio_mensual AS (
    SELECT
        mes,
        AVG(total_inscripciones) AS promedio_inscripciones  -- Promedio de inscripciones por mes
    FROM (
        SELECT 
            MONTH(fecha_inscripcion) AS mes,
            COUNT(*) AS total_inscripciones
        FROM 
            tb_alumnos
        GROUP BY 
            YEAR(fecha_inscripcion), 
            MONTH(fecha_inscripcion)
    ) AS inscripciones
    GROUP BY mes
)

-- Proyección para el próximo año, incluyendo todos los meses y colocando 0 donde no hay registros
SELECT 
    meses.mes AS 'Mes',  -- Mes para el que se hace la proyección
    IFNULL(ROUND(promedio_inscripciones), 0) AS 'Proyección'  -- Proyección de inscripciones para el próximo año
FROM 
    meses
    LEFT JOIN promedio_mensual ON meses.mes = promedio_mensual.mes
ORDER BY 
    meses.mes;";

        return Database::getRows($sql);
    }


    //Reporte específico: Historial de pagos dependiendo el id_alumno que se seleccione

    public function readAllVerPagosReport()
    {
        $sql = "SELECT CONCAT(nombre_alumno, ' ', apellido_alumno) as alumno,
                mensualidad_pagar,
                fecha_pago,
                descripcion_pago,
                categoria from tb_detalles_pagos
                INNER JOIN tb_pagos USING(id_pago)
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_alumnos USING(id_alumno)
                INNER JOIN tb_clientes USING(id_cliente)
                INNER JOIN tb_dias_pagos USING(id_dia_pago)
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
                INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                WHERE id_alumno = ? ";
        $params = array($this -> id);
        return Database::getRows($sql, $params);
    }


    //Aquí comienza todo lo de alumnos_categorias
    public function createRowAlumnosCategorias()
    {
        $sql = 'INSERT INTO tb_alumnos_categorias(id_alumno, id_staff_categorias)
                VALUES(?, ?)';
        $params = array($this->id, $this->idstaffcategoria);
        return Database::executeRow($sql, $params);
    }

    public function updateRowAlumnosCategorias()
    {
        $sql = 'UPDATE tb_alumnos_categorias
                SET id_alumno = ?, id_staff_categorias = ?
                WHERE id_alumno_categoria = ?';
        $params = array($this->id, $this->idstaffcategoria, $this->idalumnoscategoria);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowAlumnosCategorias()
    {
        $sql = 'DELETE FROM tb_alumnos_categorias
                WHERE id_alumno_categoria = ?';
        $params = array($this->idalumnoscategoria);
        return Database::executeRow($sql, $params);
    }

    public function readDatosAlumnosCategorias()
    {
    $sql = "SELECT -- Consulta principal que combina información de alumnos y staff relacionados con categorías
    t1.id_alumno_categoria, -- Identificador de la relación entre alumno y categoría
    t1.id_alumno, -- Identificador único del alumno
    t1.alumno, -- Nombre completo del alumno
    t1.imagen_categoria, -- Imagen de la categoría
    t1.categoria, -- nombre de las categorias
    COALESCE(t2.encargadostaff, 'Sin staff asignado') AS encargadostaff -- Nombre del staff o mensaje si no hay staff asignado
    
    FROM 
    (
        -- Subconsulta que obtiene información detallada de las categorías asignadas a los alumnos
        SELECT 
            id_alumno_categoria, -- Relación alumno-categoría
            id_alumno, -- Identificador del alumno
            CONCAT(nombre_alumno, ' ', apellido_alumno) AS alumno, -- Nombre completo del alumno
            id_staff_categorias, -- Relación categoría-staff
            id_categoria_horario, -- Identificador del horario de la categoría
            id_categoria_alumno, -- Identificador de la categoría del alumno
            imagen_categoria,
            categoria
        FROM 
            tb_alumnos_categorias -- Tabla que relaciona alumnos con categorías
        INNER JOIN 
            tb_alumnos USING(id_alumno) -- Une para obtener los datos del alumno
        INNER JOIN 
            tb_staffs_categorias USING(id_staff_categorias) -- Une para obtener los datos de staff asociados a las categorías
        INNER JOIN 
            tb_categorias_horarios USING(id_categoria_horario) -- Une para obtener información de los horarios
        INNER JOIN 
            tb_categorias_alumnos USING(id_categoria_alumno) -- Une para obtener información de las categorías de alumnos
        WHERE 
            id_alumno = ? -- Filtra para el alumno específico
    ) t1 -- Alias para la subconsulta principal
    LEFT JOIN 
    (
        -- Subconsulta que agrupa y concatena los nombres de los staff asignados a cada horario de categoría
        SELECT 
            id_categoria_horario, -- Identificador del horario de la categoría
            GROUP_CONCAT(CONCAT(nombre_staff, ' ', apellido_staff) SEPARATOR ', ') AS encargadostaff -- Nombres completos de los staff, separados por comas
        FROM 
            tb_staffs_categorias -- Tabla que relaciona categorías con staff
        INNER JOIN 
            tb_staffs USING(id_staff) -- Une para obtener los nombres de los staff
        GROUP BY 
            id_categoria_horario -- Agrupa por horario para consolidar los datos de los staff
    ) t2 -- Alias para la subconsulta secundaria

    ON 
    t1.id_categoria_horario = t2.id_categoria_horario; -- Une las subconsultas por el identificador del horario de la categoría
    ";
    $params = array($this->id);  // Asegúrate de que esta variable contiene el id correcto
    return Database::getRows($sql, $params);
    }


    public function readOneAlumnosCategorias()
    {
    $sql = "SELECT id_alumno_categoria, id_alumno, CONCAT(nombre_alumno, ' ', apellido_alumno) as alumno, 
            id_staff_categorias
            FROM tb_alumnos_categorias
            INNER JOIN tb_alumnos USING(id_alumno)
            WHERE id_alumno_categoria = ?";
    $params = array($this->idalumnoscategoria);  // Asegúrate de que esta variable contiene el id correcto
    return Database::getRow($sql, $params);
    }

    public function readComboStaffCategorias()
    {
        $sql = "SELECT id_staff_categorias, CONCAT(nombre_staff, ' ', apellido_staff, ' - ' , categoria) AS 'nombre_categoria' FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING(id_staff)
                INNER JOIN tb_categorias_horarios USING(id_categoria_horario)
                INNER JOIN tb_categorias_alumnos USING(id_categoria_alumno);";
        return Database::getRows($sql);
    }

}
