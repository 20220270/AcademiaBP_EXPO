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
    protected $idcategorialumnohorario = null;



    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT id_staff_categorias, CONCAT(nombre_staff, ' ', apellido_staff) AS nombre_completo, imagen_staff, categoria, imagen_categoria
                FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING (id_staff)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                WHERE nombre_staff LIKE ? OR apellido_staff LIKE ? OR categoria LIKE ?
                ORDER BY id_staff";
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_staffs_categorias (id_staff, id_categoria_horario)
                VALUES(?, ?)';
        $params = array($this->idstaff, $this->idcategorialumnohorario);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
{
    $sql = "SELECT id_staff_categorias, id_staff, CONCAT(nombre_staff, ' ', apellido_staff) AS nombre_completo, 
    imagen_staff, descripcion_extra, id_categoria_alumno, categoria, edad_minima, edad_maxima, imagen_categoria
                FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING (id_staff)
                INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
            ORDER BY id_staff_categorias";
    return Database::getRows($sql);
}


    public function readOne()
    {
        $sql = 'SELECT id_staff_categorias, id_staff, id_categoria_horario, categoria
                FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING (id_staff)
                INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                WHERE id_staff_categorias = ?';

        $params = array($this->idstaffcategoria);
        return Database::getRow($sql, $params);
    }



    public function updateRow()
    {
        $sql = 'UPDATE tb_staffs_categorias
                SET id_staff = ?, id_categoria_horario = ?
                WHERE id_staff_categorias = ?';
        $params = array($this->idstaff, $this->idcategorialumnohorario, $this->idstaffcategoria);
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

    public function readAllCategoriasHorarios()
    {
        $sql = "SELECT 
    id_categoria_horario,
    CONCAT(categoria, ', ', nombre_lugar, ', ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS horario
    FROM 
    tb_categorias_horarios
    INNER JOIN 
    tb_categorias_alumnos USING (id_categoria_alumno)
     INNER JOIN 
    tb_horarios_lugares USING (id_horario_lugar)
    INNER JOIN 
    tb_lugares_entrenamientos USING (id_lugar)
   INNER JOIN 
    tb_horarios_entrenamientos USING (id_horario)";
        return Database::getRows($sql);
    }

}
