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

    const RUTA_IMAGEN = '../../images/alumnos/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad, fecha_nacimiento, posicion_alumno, estado_alumno, categoria, fecha_inscripcion,
        CONCAT(nombre_staff, ' ', apellido_staff) AS 'Staff', numero_dias, mensualidad_pagar,
        CONCAT(nombre_cliente, ' ', apellido_cliente) as 'Encargado' FROM tb_alumnos
        INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
        INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
        INNER JOIN tb_categorias_alumnos USING(id_categoria_alumno)
        INNER JOIN tb_staffs USING (id_staff)
        INNER JOIN tb_dias_pagos USING (id_dia_pago)
        INNER JOIN tb_clientes using(id_cliente)
        WHERE CONCAT(nombre_alumno, ' ' ,apellido_alumno) LIKE ? OR categoria LIKE ? OR 
        CONCAT(nombre_staff, ' ', apellido_staff) LIKE ? OR numero_dias LIKE ? OR estado_alumno LIKE ?
        ORDER BY id_alumno";
        $params = array($value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        // Llamada al procedimiento almacenado
        $sql = 'CALL sp_insert_alumno(?, ?, ?, ?, ?, ?, ?)';

        $params = array($this->nombre, $this->apellido, $this->fechanacimiento, $this->posicion, $this->ididaspago, $this->idcliente, $this->foto);
        return Database::executeRow($sql, $params);
    }


    public function readAll()
    {
        $sql = "SELECT id_alumno, CONCAT(nombre_alumno, ' ' ,apellido_alumno) AS nombre, fecha_nacimiento, foto_alumno, fecha_inscripcion,
    TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad,
    posicion_alumno, 
    estado_alumno, 
    categoria, 
    CONCAT(nombre_staff, ' ', apellido_staff) AS 'Staff',
    numero_dias, 
    mensualidad_pagar,
    CONCAT(nombre_cliente, ' ', apellido_cliente) AS 'Encargado' 
    FROM 
    tb_alumnos
    LEFT JOIN 
    tb_staffs_categorias USING (id_staff_categorias)
    LEFT JOIN 
    tb_categorias_horarios USING(id_categoria_horario)
    LEFT JOIN 
    tb_categorias_alumnos USING(id_categoria_alumno)
    LEFT JOIN 
    tb_staffs USING (id_staff)
    LEFT JOIN 
    tb_dias_pagos USING (id_dia_pago)
    LEFT JOIN
    tb_clientes USING(id_cliente)
    ORDER BY 
    id_alumno;";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_alumno, nombre_alumno, apellido_alumno, fecha_nacimiento, posicion_alumno, id_staff_categorias, id_dia_pago, estado_alumno, id_cliente
        FROM tb_alumnos
        WHERE id_alumno = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_alumnos
                SET foto_Alumno = ?, nombre_alumno = ?, apellido_alumno = ?, fecha_nacimiento = ?, posicion_alumno = ?, id_staff_categorias = ?, id_dia_pago = ?, estado_alumno = ?, id_cliente = ?
                WHERE id_alumno = ?';
        $params = array($this->foto, $this->nombre, $this->apellido, $this->fechanacimiento, $this->posicion, $this->idstaffcategoria, $this->ididaspago, $this->estado, $this->idcliente, $this->id);
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

    public function readAllDiasPago()
    {
        $sql = "SELECT id_dia_pago, CONCAT(numero_dias, ' Días, $', mensualidad_pagar) AS 'dia_pago' FROM tb_dias_pagos;";
        return Database::getRows($sql);
    }

    //Gráfico para saber las categorías con más alumnos

    public function categoriasConMasAlumnos()
    {
        $sql = "SELECT 
                categoria,
                COUNT(id_alumno) AS cantidad_alumnos
                FROM 
                tb_alumnos
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

    /* Esta es la consulta para mostrar un estimado de cuántos alumnos se registrarán en el año */

    /** Explicación de los datos obtenidos:
     * 
     * 1. **Inscripciones Mensuales:**
     * Se toman todos los registros de alumnos por cada mes hasta la fecha actual del año en curso, 
     * y se agrupan por mes. Esto nos proporciona la cantidad de inscripciones de alumnos para cada mes.
     * 
     * 2. **Tasa Promedio de Inscripción:**
     * A partir de las inscripciones mensuales, se calcula la tasa promedio mensual de inscripciones. 
     * Esta tasa se obtiene dividiendo la suma total de inscripciones entre el número de meses en los 
     * que hay datos registrados.
     * 
     * 3. **Total Actual de Inscripciones:**
     * Se suma el total de inscripciones registradas hasta la fecha actual. Este es el número de 
     * inscripciones de alumnos que ya han ocurrido en el año.
     * 
     * 4. **Proyección de Inscripciones:**
     * Para la proyección, se calcula cuántos meses faltan hasta el final del año. 
     * Esto se hace restando el número de meses con datos registrados del total de 12 meses del año.
     * 
     * 5. **Estimación Total Anual:**
     * Luego, se multiplica la tasa promedio de inscripciones por los meses restantes. 
     * Este valor es la proyección de inscripciones para los meses restantes.
     * Finalmente, para obtener el número total de inscripciones al finalizar el año, 
     * se suma el total de inscripciones actuales con la proyección de inscripciones para los meses restantes.
     */
    public function alumnosPredictGraph()
    {
        $sql = "WITH inscripciones_mensuales AS (
        SELECT 
            MONTH(fecha_inscripcion) AS mes,  -- Mes de la inscripción
            COUNT(*) AS inscripciones  -- Número de inscripciones en ese mes
        FROM tb_alumnos
        WHERE YEAR(fecha_inscripcion) = YEAR(CURDATE())  -- Filtra por el año en curso
        GROUP BY MONTH(fecha_inscripcion)  -- Agrupa por mes
    ),
    
    tasa_inscripcion AS (
        SELECT 
            AVG(inscripciones) AS tasa_promedio_mensual  -- Calcula la tasa promedio mensual de inscripciones
        FROM inscripciones_mensuales
    ),
    
    total_inscripciones AS (
        SELECT 
            SUM(inscripciones) AS total_actual  -- Suma el total de inscripciones actuales
        FROM inscripciones_mensuales
    )
    
    -- Consulta principal
    SELECT 
        mes AS 'Mes',  -- Muestra el mes
        inscripciones AS 'Inscripciones',  -- Muestra las inscripciones mensuales
        NULL AS 'Proyección',  -- No muestra la proyección en esta parte
        NULL AS 'Total Anual'  -- No muestra el total anual en esta parte
    FROM inscripciones_mensuales
    
    UNION ALL  -- Combina los resultados anteriores con los siguientes
    
    SELECT 
        NULL AS 'Mes',  -- No muestra el mes en esta parte
        NULL AS 'Inscripciones',  -- No muestra las inscripciones mensuales en esta parte
        ROUND(tasa_promedio_mensual * (12 - MONTH(CURDATE())), 0) AS 'Proyección',  -- Calcula la proyección de inscripciones
        (total_actual + ROUND(tasa_promedio_mensual * (12 - MONTH(CURDATE())), 0)) AS 'Total Anual'  -- Calcula el total anual proyectado
    FROM tasa_inscripcion, total_inscripciones;
    ";

        return Database::getRows($sql);
    }

}
