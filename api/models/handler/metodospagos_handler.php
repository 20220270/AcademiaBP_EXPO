<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class MetodosPagosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $metodo = null;
    protected $imagen = null;


    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/metodospagos/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_metodo_pago, nombre_metodo, imagen_metodo
                FROM tb_metodos_pago
                WHERE nombre_metodo LIKE ?
                ORDER BY nombre_metodo';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_metodos_pago(nombre_metodo, imagen_metodo)
                VALUES(?, ?)';
        $params = array($this->metodo, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_metodo_pago, nombre_metodo, imagen_metodo
                FROM tb_metodos_pago
                ORDER BY nombre_metodo';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_metodo_pago, nombre_metodo, imagen_metodo
                FROM tb_metodos_pago
                WHERE id_metodo_pago = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_metodo
                FROM tb_metodos_pago
                WHERE id_metodo_pago = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_metodos_pago
                SET imagen_metodo = ?, nombre_metodo = ?
                WHERE id_metodo_pago = ?';
        $params = array($this->imagen, $this->metodo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_metodos_pago
                WHERE id_metodo_pago = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
