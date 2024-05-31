<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class ValoresHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $imagen = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/valores/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_valor, nombre_valor, imagen_valor, descripcion_valor
                FROM tb_valores
                WHERE nombre_valor LIKE ? OR descripcion_valor LIKE ?
                ORDER BY id_valor';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_valores(nombre_valor, descripcion_valor, imagen_valor)
                VALUES(?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_valor, nombre_valor, imagen_valor, descripcion_valor
                FROM tb_valores
                ORDER BY id_valor';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_valor, nombre_valor, imagen_valor, descripcion_valor
                FROM tb_valores
                WHERE id_valor = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_valor
                FROM tb_valores
                WHERE id_valor = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_valores
                SET imagen_valor = ?, nombre_valor = ?, descripcion_valor = ?
                WHERE id_valor = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_valores
                WHERE id_valor = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
