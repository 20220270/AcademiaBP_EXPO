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
                 INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
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
        $sql = "SELECT id_staff_categorias, id_staff, id_categoria_horario, categoria, CONCAT(nombre_staff, ' ' ,apellido_staff) as 'Nombre'
                FROM tb_staffs_categorias
                INNER JOIN tb_staffs USING (id_staff)
                INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                WHERE id_staff_categorias = ?";

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

    //Combobox que muestra el nombre completo del miembro del staff, esto gracias a la función CONCAT.
    //El combobox mandará a la base de datos el id del staff.
    public function readAllStaffs()
    {
        $sql = "SELECT id_staff, CONCAT(nombre_staff, ' ', apellido_staff) AS 'Nombre completo' FROM tb_staffs;";
        return Database::getRows($sql);
    }

    //Combobox que muestra las categorías de alumnos registradas, las cuales se obtienen desde la tabla intermedia entre
    //Las categorías de alumnos y los horarios de entrenamiento.
    //El combobox enviará a la base de datos el id de la tabla intermedia y se lo asignará a un miembro del staff
    public function readAllCategoriasHorarios()
    {
        $sql = "SELECT
    id_categoria_horario,
    categoria
    FROM 
    tb_categorias_horarios
    INNER JOIN 
    tb_categorias_alumnos USING (id_categoria_alumno)
     INNER JOIN 
    tb_horarios_lugares USING (id_horario_lugar)
    INNER JOIN 
    tb_lugares_entrenamientos USING (id_lugar)
   INNER JOIN 
    tb_horarios_entrenamientos USING (id_horario)
    GROUP BY categoria";
        return Database::getRows($sql);
    }


    public function readAllAlumnosStaff()
{
    $sql = "SELECT 
            foto_alumno, 
            CONCAT(nombre_alumno, ' ', apellido_alumno) AS nombre_alumnos, 
            TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad, 
            CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_clientes
        FROM 
            tb_alumnos 
        INNER JOIN 
            tb_staffs_categorias USING (id_staff_categorias)
        INNER JOIN 
            tb_categorias_horarios USING (id_categoria_horario)
        INNER JOIN 
            tb_staffs USING (id_staff) 
        INNER JOIN 
            tb_clientes USING (id_cliente)
        WHERE 
            id_staff_categorias = ? 
            AND id_categoria_horario = (SELECT id_categoria_horario FROM tb_staffs_categorias WHERE id_staff_categorias = ?)
        ORDER BY 
            id_staff;
    ";
    // Aquí debes pasar los dos parámetros para el filtro
    $params = array($this->idstaffcategoria, $this->idstaffcategoria);
    return Database::getRows($sql, $params);
}


}
