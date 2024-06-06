<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class AliadosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $logo = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/aliados/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_aliado, nombre_aliado, imagen_aliado
                FROM tb_aliados
                WHERE nombre_aliado LIKE ?
                ORDER BY id_aliado';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_aliados(nombre_aliado, imagen_aliado)
                VALUES(?, ?)';
        $params = array($this->nombre, $this->logo);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_aliado, nombre_aliado, imagen_aliado
                FROM tb_aliados
                ORDER BY id_aliado';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_aliado, nombre_aliado, imagen_aliado
                FROM tb_aliados
                WHERE id_aliado = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_aliado
                FROM tb_aliados
                WHERE id_aliado = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_aliados
                SET imagen_aliado = ?, nombre_aliado = ?
                WHERE id_aliado = ?';
        $params = array($this->logo, $this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_aliados
                WHERE id_aliado = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
