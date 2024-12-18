<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class DetallesPagosMensualidadHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $iddetalle = null;
    protected $idpago = null;
    protected $descripcionpago = null;
    protected $fechaproximopago = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_detalle_pago, id_pago, fecha_pago, mensualidad_pagar,  CONCAT(nombre_alumno, ' ', apellido_alumno) as 'Alumno', estado_proximo_pago,
            descripcion_pago, fecha_proximo_pago from tb_detalles_pagos
            INNER JOIN tb_pagos USING (id_pago)
            INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
            INNER JOIN tb_alumnos USING (id_alumno)
            INNER JOIN tb_dias_pagos USING (id_dia_pago)
            INNER JOIN tb_clientes USING(id_cliente)
                WHERE fecha_pago LIKE ? OR nombre_alumno LIKE ? OR apellido_alumno LIKE ? OR fecha_proximo_pago LIKE ?
                ORDER BY id_detalle_pago";
        $params = array($value, $value , $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
{
    // Llamar al procedimiento almacenado que inserta el detalle de pago y calcula fecha_proximo_pago
    $sql = 'CALL insertar_detalle_pago(?, ?, @id_detalle_pago)';
    $params = array($this->idpago, $this->descripcionpago);
    
    // Ejecutar la consulta
    return Database::executeRow($sql, $params);
}


    
    //Métodos para visualizar la boleta de pago

    //Ordenar boltas por ID
    public function readAll()
    {
        $sql = "SELECT id_detalle_pago, id_pago, fecha_pago, mensualidad_pagar,  CONCAT(nombre_alumno, ' ', apellido_alumno) as 'Alumno',
                descripcion_pago, fecha_proximo_pago, estado_proximo_pago from tb_detalles_pagos
                INNER JOIN tb_pagos USING (id_pago)
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_alumnos USING (id_alumno)
                INNER JOIN tb_dias_pagos USING (id_dia_pago)
                INNER JOIN tb_clientes USING(id_cliente)
                ORDER BY id_detalle_pago";
        return Database::getRows($sql);
    }

    //Boletas de pago recientes
    public function readAllRecientes()
    {
        $sql = "SELECT id_detalle_pago, id_pago, fecha_pago, mensualidad_pagar,  CONCAT(nombre_alumno, ' ', apellido_alumno) as 'Alumno',
                descripcion_pago, fecha_proximo_pago, estado_proximo_pago from tb_detalles_pagos
                INNER JOIN tb_pagos USING (id_pago)
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_alumnos USING (id_alumno)
                INNER JOIN tb_dias_pagos USING (id_dia_pago)
                INNER JOIN tb_clientes USING(id_cliente)
                ORDER BY id_detalle_pago DESC";
        return Database::getRows($sql);
    }

    //Boletas de pago pagadas
    public function readAllPagadas()
    {
        $sql = "SELECT id_detalle_pago, id_pago, fecha_pago, mensualidad_pagar,  CONCAT(nombre_alumno, ' ', apellido_alumno) as 'Alumno',
                descripcion_pago, fecha_proximo_pago, estado_proximo_pago from tb_detalles_pagos
                INNER JOIN tb_pagos USING (id_pago)
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_alumnos USING (id_alumno)
                INNER JOIN tb_dias_pagos USING (id_dia_pago)
                INNER JOIN tb_clientes USING(id_cliente)
                WHERE estado_proximo_pago = 'Pagado'
                ORDER BY id_detalle_pago";
        return Database::getRows($sql);
    }

    //Boletas de pago no pagadas
    public function readAllNoPagadas()
    {
        $sql = "SELECT id_detalle_pago, id_pago, fecha_pago, mensualidad_pagar,  CONCAT(nombre_alumno, ' ', apellido_alumno) as 'Alumno',
                descripcion_pago, fecha_proximo_pago, estado_proximo_pago from tb_detalles_pagos
                INNER JOIN tb_pagos USING (id_pago)
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_alumnos USING (id_alumno)
                INNER JOIN tb_dias_pagos USING (id_dia_pago)
                INNER JOIN tb_clientes USING(id_cliente)
                WHERE estado_proximo_pago = 'Pendiente de pago'
                ORDER BY id_detalle_pago";
        return Database::getRows($sql);
    }

    //Boletas de pago no pagadas
    public function readAllFecha()
    {
        $sql = "SELECT id_detalle_pago, id_pago, fecha_pago, mensualidad_pagar,  CONCAT(nombre_alumno, ' ', apellido_alumno) as 'Alumno',
                descripcion_pago, fecha_proximo_pago, estado_proximo_pago from tb_detalles_pagos
                INNER JOIN tb_pagos USING (id_pago)
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_alumnos USING (id_alumno)
                INNER JOIN tb_dias_pagos USING (id_dia_pago)
                INNER JOIN tb_clientes USING(id_cliente)
                WHERE fecha_proximo_pago = ?
                ORDER BY id_detalle_pago";
            $params = array($this->fechaproximopago);
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = "SELECT id_detalle_pago, id_pago, descripcion_pago, fecha_proximo_pago from tb_detalles_pagos
                WHERE id_detalle_pago = ?";
        $params = array($this->iddetalle);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_detalles_pagos
                SET id_pago = ?, descripcion_pago = ?, fecha_proximo_pago = ?
                WHERE id_detalle_pago = ?';
        $params = array($this->idpago, $this->descripcionpago,  $this->fechaproximopago, $this->iddetalle);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_detalles_pagos
                WHERE id_detalle_pago = ?';
        $params = array($this->iddetalle);
        return Database::executeRow($sql, $params);
    }

    public function readAllPagos()
    {
        $sql = "SELECT 
                id_pago, 
                CONCAT(
                nombre_alumno, ' ', apellido_alumno, ' - ', 
                fecha_pago, ' - $', 
                mensualidad_pagar
                ) AS Detalles
                FROM tb_pagos
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_alumnos USING (id_alumno)
                INNER JOIN tb_dias_pagos USING (id_dia_pago)    
                ORDER BY id_pago";
        return Database::getRows($sql);
    }

    public function readAllVerPagos()
    {
        $sql = "SELECT CONCAT(nombre_alumno, ' ', apellido_alumno) as alumno,
                mensualidad_pagar,
                fecha_pago,
                descripcion_pago from tb_detalles_pagos
                INNER JOIN tb_pagos USING(id_pago)
                INNER JOIN tb_alumnos_categorias USING(id_alumno_categoria)
                INNER JOIN tb_alumnos USING(id_alumno)
                INNER JOIN tb_clientes USING(id_cliente)
                INNER JOIN tb_dias_pagos USING(id_dia_pago)
                where id_cliente = ? ";
        $params = array($_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }
}

