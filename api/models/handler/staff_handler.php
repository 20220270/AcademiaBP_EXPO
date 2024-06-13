<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class StaffHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $descripcion = null;
    protected $imagen = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/staff/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_staff_categorias, id_staff, nombre_staff, apellido_staff, imagen_staff, descripcion_extra, id_categoria_alumno, categoria, edad_minima, edad_maxima, imagen_categoria
                FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING (id_staff)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno);
                WHERE nombre_staff LIKE ? OR apellido_staff LIKE ? OR categoria LIKE ?
                ORDER BY id_staff';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_staffs(nombre_staff, apellido_staff, descripcion_extra, imagen_staff)
                VALUES(?, ?, ?, ?)';
        $params = array($this->nombre,  $this->apellido, $this->descripcion, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_staff, nombre_staff, apellido_staff, imagen_staff, descripcion_extra
                FROM tb_staffs
                ORDER BY id_staff';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_staff, nombre_staff, apellido_staff, imagen_staff, descripcion_extra
                FROM tb_staffs
                WHERE id_staff = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_staff
                FROM tb_staffs
                WHERE id_staff = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_staffs
                SET imagen_staff = ?, nombre_staff = ?, apellido_staff = ?, descripcion_extra = ?
                WHERE id_staff = ?';
        $params = array($this->imagen, $this->nombre,  $this->apellido, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_staffs
                WHERE id_staff = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
