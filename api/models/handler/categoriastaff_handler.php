<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CategoriaStaffHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idstaffcategoria = null;
    protected $idstaff = null;
    protected $idcategorialumno = null;



    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_categoria_producto, categoria_producto, imagen_categoria
                FROM tb_categorias_productos
                WHERE categoria_producto LIKE ?
                ORDER BY id_categoria_producto';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_staffs_categorias (id_staff, id_categoria_alumno)
                VALUES(?, ?)';
        $params = array($this->idstaff, $this->idcategorialumno);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
{
    $sql = "SELECT id_staff_categorias, CONCAT(nombre_staff, ' ', apellido_staff) AS 'Nombre_completo', imagen_staff, categoria, imagen_categoria
            FROM tb_staffs_categorias
            INNER JOIN tb_staffs USING (id_staff)
            INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
            ORDER BY id_staff_categorias";
    return Database::getRows($sql);
}


    public function readOne()
    {
        $sql = 'SELECT id_staff_categorias, id_staff, id_categoria_alumno
                FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING (id_staff)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                WHERE id_staff_categorias = ?';

        $params = array($this->idstaffcategoria);
        return Database::getRow($sql, $params);
    }



    public function updateRow()
    {
        $sql = 'UPDATE tb_staffs_categorias
                SET id_staff = ?, id_categoria_alumno = ?
                WHERE id_staff_categorias = ?';
        $params = array($this->idstaff, $this->idcategorialumno, $this->idstaffcategoria);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_staffs_categorias
                WHERE id_staff_categorias = ?';
        $params = array($this->idstaffcategoria);
        return Database::executeRow($sql, $params);
    }

    public function readAllStaffs()
    {
        $sql = "SELECT id_staff, CONCAT(nombre_staff, ' ', apellido_staff) AS 'Nombre completo' FROM tb_staffs;";
        return Database::getRows($sql);
    }

    public function readAllCategorias()
    {
        $sql = "SELECT id_categoria_alumno, categoria FROM tb_categorias_alumnos;";
        return Database::getRows($sql);
    }
}
