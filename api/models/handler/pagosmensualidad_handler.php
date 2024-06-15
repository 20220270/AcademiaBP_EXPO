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
    protected $idalumnocliente = null;
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
        INNER JOIN tb_alumnos_clientes USING (id_alumno_cliente)
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
        $sql = 'INSERT INTO tb_pagos(cuotas_anuales, id_alumno_cliente, estado_pago)
                VALUES(?, ?, ?)';
        $params = array($this->cuotasanuales, $this->idalumnocliente, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = "SELECT id_pago, CONCAT(nombre_alumno, ' ', apellido_alumno) as 'Alumno',
        CONCAT(nombre_cliente, ' ', apellido_cliente) as 'Encargado', telefono_cliente, numero_dias, mensualidad_pagar, estado_pago, fecha_pago from tb_pagos
        INNER JOIN tb_alumnos_clientes USING (id_alumno_cliente)
        INNER JOIN tb_alumnos USING(id_alumno)
        INNER JOIN tb_clientes USING(id_cliente)
        INNER JOIN tb_dias_pagos USING(id_dia_pago)
        ORDER BY id_pago;";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = "SELECT id_pago, id_alumno_cliente, cuotas_anuales, estado_pago from tb_pagos
        INNER JOIN tb_alumnos_clientes USING (id_alumno_cliente)
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
                SET estado_pago = ?, id_alumno_cliente = ?, cuotas_anuales = ?
                WHERE id_pago = ?';
        $params = array($this->estado, $this->idalumnocliente, $this->cuotasanuales, $this->idpago);
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
                id_alumno_cliente, 
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
            FROM tb_alumnos_clientes
            INNER JOIN tb_alumnos USING(id_alumno)
            INNER JOIN tb_clientes USING(id_cliente)
            INNER JOIN tb_dias_pagos USING(id_dia_pago);";
        return Database::getRows($sql);
    }
}