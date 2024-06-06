<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class NivelesAdminsHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nivel = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_nivel, nivel
                FROM tb_niveles_administradores
                WHERE nivel LIKE ?
                ORDER BY id_nivel';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_niveles_administradores(nivel)
                VALUES(?)';
        $params = array($this->nivel);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_nivel, nivel
                FROM tb_niveles_administradores
                ORDER BY id_nivel';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_nivel, nivel
        FROM tb_niveles_administradores
                WHERE id_nivel = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_niveles_administradores
                SET nivel = ?
                WHERE id_nivel = ?';
        $params = array($this->nivel, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_niveles_administradores
                WHERE id_nivel = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
