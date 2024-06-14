<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class AlumnosClientesHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idalumnocliente = null;
    protected $idalumno = null;
    protected $idcliente = null;



    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_alumno_cliente, CONCAT(nombre_cliente, ' ', apellido_cliente) AS 'Cliente', CONCAT(nombre_alumno, ' ', apellido_alumno) AS 'Alumno' FROM tb_alumnos_clientes
                INNER JOIN tb_clientes USING(id_cliente)
                INNER JOIN tb_alumnos USING(id_alumno)
                WHERE nombre_cliente LIKE ? OR apellido_cliente LIKE ? OR nombre_alumno LIKE ? OR apellido_alumno LIKE ?
                ORDER BY id_alumno_cliente
                ";
        $params = array($value, $value, $value , $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_alumnos_clientes (id_cliente, id_alumno)
                VALUES(?, ?)';
        $params = array($this->idcliente, $this->idalumno);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
{
    $sql = "SELECT id_alumno_cliente, CONCAT(nombre_cliente, ' ', apellido_cliente) AS 'Cliente', CONCAT(nombre_alumno, ' ', apellido_alumno) AS 'Alumno' FROM tb_alumnos_clientes
                INNER JOIN tb_clientes USING(id_cliente)
                INNER JOIN tb_alumnos USING(id_alumno)
            ORDER BY id_alumno_cliente";
    return Database::getRows($sql);
}


    public function readOne()
    {
        $sql = 'SELECT id_alumno_cliente, id_cliente, id_alumno
                FROM tb_alumnos_clientes
                INNER JOIN tb_clientes USING(id_cliente)
                INNER JOIN tb_alumnos USING(id_alumno)
                WHERE id_alumno_cliente = ?';

        $params = array($this->idalumnocliente);
        return Database::getRow($sql, $params);
    }



    public function updateRow()
    {
        $sql = 'UPDATE tb_alumnos_clientes
                SET id_cliente = ?, id_alumno = ?
                WHERE id_alumno_cliente = ?';
        $params = array($this->idcliente, $this->idalumno, $this->idalumnocliente);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_alumnos_clientes
                WHERE id_alumno_cliente = ?';
        $params = array($this->idalumnocliente);
        return Database::executeRow($sql, $params);
    }

    public function readAllAlumnos()
    {
        $sql = "SELECT id_alumno,  CONCAT(nombre_alumno, ' ', apellido_alumno) AS 'Alumno' FROM tb_alumnos;";
        return Database::getRows($sql);
    }

    public function readAllClientes()
    {
       

        $sql = "SELECT id_cliente,  CONCAT(nombre_cliente, ' ', apellido_cliente) AS 'Cliente' FROM tb_clientes;";
        return Database::getRows($sql);
    }
}
