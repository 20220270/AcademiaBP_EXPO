<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class DiasPagoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $numerodias = null;
    protected $pagodia = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_dia_pago, numero_dias, mensualidad_pagar 
        FROM tb_dias_pagos 
        WHERE numero_dias LIKE ? OR mensualidad_pagar LIKE ?";
    
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    /*Se ocupa select distinct para evitar datos repetidos

    *Les asignamos un identificador a cada campo para relacionarlos a su respectiva tabla

    Ocupamos JOIN (No inner join) para referencias varias tablas (en nuestro caso, colores y tallas) basándonos en una condicion, la cual es 1=1 y que siempre es verdadero,
    lo que nos permite unir las tablas sin problemas. Esto lo hacemos ya que las tres tablas no cuentan con un campo en común.

    Los agrupamos por elementos específicos
     */
    


    public function createRow()
    {
        $sql = 'INSERT INTO tb_dias_pagos(numero_dias, mensualidad_pagar)
                VALUES(?, ?)';
        $params = array($this->numerodias, $this->pagodia);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_dia_pago, numero_dias, mensualidad_pagar 
                FROM tb_dias_pagos
                ORDER BY id_dia_pago';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_dia_pago, numero_dias, mensualidad_pagar 
                FROM tb_dias_pagos
                WHERE id_dia_pago = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_dias_pagos
                SET numero_dias = ?, mensualidad_pagar = ?
                WHERE id_dia_pago = ?';
        $params = array($this->numerodias, $this->pagodia, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_dias_pagos
                WHERE id_dia_pago = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
