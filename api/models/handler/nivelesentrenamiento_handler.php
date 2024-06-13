<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class NivelesEntrenamientoHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $imagen = null;


    // Constante para establecer la ruta de las imágenes, tanto de niveles como de categorías.
    const RUTA_IMAGEN = '../../images/niveles/';


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_nivel_entrenamiento, nivel_entrenamiento, descripcion_nivel, imagen_nivel
                FROM tb_niveles_entrenamientos
                WHERE nivel_entrenamiento LIKE ?
                ORDER BY id_nivel_entrenamiento';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_niveles_entrenamientos(nivel_entrenamiento, descripcion_nivel, imagen_nivel)
                VALUES(?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_nivel_entrenamiento, nivel_entrenamiento, descripcion_nivel, imagen_nivel
                FROM tb_niveles_entrenamientos
                ORDER BY id_nivel_entrenamiento';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_nivel_entrenamiento, nivel_entrenamiento, descripcion_nivel, imagen_nivel
                FROM tb_niveles_entrenamientos
                WHERE id_nivel_entrenamiento = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_nivel
                FROM tb_niveles_entrenamientos
                WHERE id_nivel_entrenamiento = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_niveles_entrenamientos
                SET imagen_nivel = ?, nivel_entrenamiento = ?, descripcion_nivel = ?
                WHERE id_nivel_entrenamiento = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_niveles_entrenamientos
                WHERE id_nivel_entrenamiento = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
