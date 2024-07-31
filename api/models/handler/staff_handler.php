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
        $sql = "SELECT id_staff, CONCAT(nombre_staff, ' ', apellido_staff) AS nombre_completo, descripcion_extra, imagen_staff FROM tb_staffs
                WHERE CONCAT(nombre_staff, ' ', apellido_staff) LIKE ? OR apellido_staff LIKE ?
                ORDER BY id_staff";
        $params = array($value, $value);
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
        $sql = "SELECT id_staff, CONCAT(nombre_staff, ' ', apellido_staff) AS nombre_completo, imagen_staff, descripcion_extra
                FROM tb_staffs
                ORDER BY id_staff";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = "SELECT id_staff, nombre_staff, apellido_staff, imagen_staff, descripcion_extra, CONCAT(nombre_staff, ' ' ,apellido_staff) as 'Nombre'
                FROM tb_staffs
                WHERE id_staff = ?";
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

    //Métodos para los reportes del staff

    //Reporte de todos los miembros del staff


    //Reporte de todos los alumnos a cargo del miembro del staff seleccionado.

    public function readAllAlumnosStaff()
    {
        $sql = "SELECT CONCAT(nombre_alumno, ' ', apellido_alumno) AS nombre_alumnos, TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS 'edad'
                FROM tb_alumnos INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
                INNER JOIN tb_staffs USING (id_staff) where id_staff = ?
                GROUP BY nombre_alumnos
                ORDER BY id_staff;";
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }
}
