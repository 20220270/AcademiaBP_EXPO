<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class PagosMensualidadHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idpago = null;
    protected $fecha = null;
    protected $idalumno= null;
    protected $cuotasanuales = null;
    protected $cuotaspendiente = null;
    protected $estado = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_pago, CONCAT(nombre_alumno, ' ', apellido_alumno) as 'Alumno',
            CONCAT(nombre_cliente, ' ', apellido_cliente) as 'Encargado',   telefono_cliente, numero_dias, mensualidad_pagar, estado_pago, fecha_pago from tb_pagos
            INNER JOIN tb_alumnos USING(id_alumno)
            INNER JOIN tb_clientes USING(id_cliente)
            INNER JOIN tb_dias_pagos USING(id_dia_pago)
        WHERE nombre_cliente LIKE ? OR nombre_alumno LIKE ? OR apellido_alumno LIKE ? OR apellido_cliente LIKE ? OR estado_pago LIKE ? OR fecha_pago LIKE ?
        ORDER BY id_pago;";
        $params = array($value, $value, $value, $value , $value , $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'CALL insertar_pago(?)';
        $params = array($this->idalumno);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = "SELECT id_pago, 
                   CONCAT(nombre_alumno, ' ', apellido_alumno) AS 'Alumno',
                   CONCAT(nombre_cliente, ' ', apellido_cliente) AS 'Encargado', 
                   telefono_cliente, 
                   numero_dias, 
                   mensualidad_pagar, 
                   estado_pago, 
                   fecha_pago 
            FROM tb_pagos
            INNER JOIN tb_alumnos USING(id_alumno)
            INNER JOIN tb_clientes USING(id_cliente)
            INNER JOIN tb_dias_pagos USING(id_dia_pago)
            WHERE YEAR(fecha_pago) = YEAR(CURDATE()) 
              AND MONTH(fecha_pago) = MONTH(CURDATE())
            ORDER BY fecha_pago DESC;";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = "SELECT id_pago, id_alumno, estado_pago from tb_pagos
        INNER JOIN tb_alumnos USING(id_alumno)
        INNER JOIN tb_clientes USING(id_cliente)
        INNER JOIN tb_dias_pagos USING(id_dia_pago)
        WHERE id_pago = ?";
        $params = array($this->idpago);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_pagos
                SET estado_pago = ?, id_alumno = ?
                WHERE id_pago = ?';
        $params = array($this->estado, $this->idalumno, $this->idpago);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_pagos
                WHERE id_pago = ?';
        $params = array($this->idpago);
        return Database::executeRow($sql, $params);
    }

    //Consulta para llenar el combobox con los datos del cliente y alumno a pagar

    public function readAllAlumnosCliente()
    {
        $sql = "SELECT 
                id_alumno, 
                CONCAT(
                nombre_alumno, ' ', apellido_alumno, ' - ', 
                nombre_cliente, ' ', apellido_cliente, ' - ', 
                numero_dias, ' ', 
                CASE 
                WHEN numero_dias = 1 THEN 'día' 
                ELSE 'días' 
                END, ' - $ ', 
                mensualidad_pagar
                ) AS Detalles
            FROM tb_alumnos
            INNER JOIN tb_clientes USING(id_cliente)
            INNER JOIN tb_dias_pagos USING(id_dia_pago)
            ORDER BY id_alumno";
        return Database::getRows($sql);
    }

    //Métodos para el conteo de alumnos

    public function readAlumnosTotal()
    {
        $sql = "SELECT COUNT(*) AS total_alumnos_registrados FROM tb_alumnos;";
        return Database::getRows($sql);
    }


    //Alumnos que ya hayan pagado su mensualidad
    public function readAlumnosSolventes()
    {
        $sql = "SELECT 'Alumnos solventes con el pago.' AS descripcion, 
                COUNT(CONCAT(nombre_alumno, ' ', apellido_alumno)) AS total_alumnos_registradoss 
                FROM tb_pagos
                INNER JOIN tb_alumnos USING(id_alumno)
                WHERE estado_pago = 'Pagado'
                AND YEAR(fecha_pago) = YEAR(CURDATE()) 
                AND MONTH(fecha_pago) = MONTH(CURDATE());";
        return Database::getRows($sql);
    }

    //Métodos para el conteo de alumnos sin cancelar su mensualidad
    //Restamos los alumnos existencias y los que ya están solventes, para saber cuántos no han pagado
    public function readAlumnosSinPagar()
    {
        $sql = "SELECT 
                (SELECT COUNT(*) FROM tb_alumnos) - 
                (SELECT COUNT(*) FROM tb_pagos WHERE estado_pago = 'Pagado' AND YEAR(fecha_pago) = YEAR(CURDATE()) 
              AND MONTH(fecha_pago) = MONTH(CURDATE())) 
                AS total_alumnos_sin_pagar;";
        return Database::getRows($sql);
    }

    public function reportPagos()
    {
        $sql = "SELECT CONCAT(nombre_alumno, ' ', apellido_alumno) AS Nombre, CONCAT(nombre_cliente, ' ', apellido_cliente) AS NombreCliente, 
        mensualidad_pagar, fecha_pago from tb_pagos
        INNER JOIN tb_alumnos USING (id_alumno)
        INNER JOIN tb_clientes USING (id_cliente)
        INNER JOIN tb_dias_pagos USING (id_dia_pago)
        ORDER BY fecha_pago ASC";
        return Database::getRows($sql);
    }

    //Consulta para el reporte de la boleta de pagos

    public function readBoletaPagos()
    {
        $sql = "SELECT id_detalle_pago, id_pago, fecha_pago, numero_dias, mensualidad_pagar, CONCAT(nombre_alumno, ' ', apellido_alumno) as nombre,
            categoria, descripcion_pago, fecha_proximo_pago 
            FROM tb_detalles_pagos
            INNER JOIN tb_pagos USING (id_pago)
            INNER JOIN tb_alumnos USING (id_alumno)
            INNER JOIN tb_dias_pagos USING (id_dia_pago)
            INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
            INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
            INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
            WHERE id_pago = ?";
        $params = array($this->idpago);
        return Database::getRows($sql, $params);
    }
}