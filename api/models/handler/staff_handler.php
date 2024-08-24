<?php
require_once ('../../helpers/database.php');

class StaffHandler
{
    protected $id = null; // ID del staff
    protected $nombre = null; // Nombre del staff
    protected $apellido = null; // Apellido del staff
    protected $descripcion = null; // Descripción adicional del staff
    protected $imagen = null; // Imagen del staff

    const RUTA_IMAGEN = '../../images/staff/'; // Ruta para las imágenes del staff

    /*
     * Busca en la base de datos staff que coincidan con el valor de búsqueda.
     * Retorna una lista de registros con id_staff, nombre completo, descripción e imagen.
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%'; // Prepara el valor de búsqueda
        $sql = "SELECT id_staff, CONCAT(nombre_staff, ' ', apellido_staff) AS nombre_completo, descripcion_extra, imagen_staff 
                FROM tb_staffs
                WHERE CONCAT(nombre_staff, ' ', apellido_staff) LIKE ? OR apellido_staff LIKE ?
                ORDER BY id_staff";
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    /*
     * Crea un nuevo registro en la tabla tb_staffs.
     * Usa los atributos de la clase para los valores a insertar.
     */
    public function createRow()
    {
        $sql = 'INSERT INTO tb_staffs(nombre_staff, apellido_staff, descripcion_extra, imagen_staff)
                VALUES(?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->descripcion, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    /*
     * Lee todos los registros de la tabla tb_staffs.
     * Retorna id_staff, nombre completo, imagen y descripción.
     */
    public function readAll()
    {
        $sql = "SELECT id_staff, CONCAT(nombre_staff, ' ', apellido_staff) AS nombre_completo, imagen_staff, descripcion_extra
                FROM tb_staffs
                ORDER BY id_staff";
        return Database::getRows($sql);
    }

    /*
     * Lee todos los registros de la tabla tb_staffs para reportes.
     * Retorna id_staff, nombre, apellido y descripción.
     */
    public function readAllReport()
    {
        $sql = "SELECT id_staff, CONCAT(nombre_staff, ' ', apellido_staff) AS nombre_completo, categoria, nivel_entrenamiento
                FROM tb_staffs_categorias LEFT JOIN tb_staffs USING (id_staff)
                LEFT JOIN tb_categorias_horarios USING (id_categoria_horario)
                LEFT JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                LEFT JOIN tb_niveles_entrenamientos USING (id_nivel_entrenamiento)
                ORDER BY id_staff;";
        return Database::getRows($sql);
    }

    /*
     * Lee un registro específico de la tabla tb_staffs.
     * Usa el id del staff para seleccionar el registro.
     */
    public function readOne()
    {
        $sql = "SELECT id_staff, nombre_staff, apellido_staff, imagen_staff, descripcion_extra, CONCAT(nombre_staff, ' ' ,apellido_staff) as 'Nombre'
                FROM tb_staffs
                WHERE id_staff = ?";
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    /*
     * Lee el nombre del archivo de imagen del staff.
     * Usa el id del staff para seleccionar el registro.
     */
    public function readFilename()
    {
        $sql = 'SELECT imagen_staff
                FROM tb_staffs
                WHERE id_staff = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    /*
     * Actualiza un registro específico en la tabla tb_staffs.
     * Usa los atributos de la clase para los nuevos valores.
     */
    public function updateRow()
    {
        $sql = 'UPDATE tb_staffs
                SET imagen_staff = ?, nombre_staff = ?, apellido_staff = ?, descripcion_extra = ?
                WHERE id_staff = ?';
        $params = array($this->imagen, $this->nombre, $this->apellido, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    /*
     * Elimina un registro específico de la tabla tb_staffs.
     * Usa el id del staff para seleccionar el registro a eliminar.
     */
    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_staffs
                WHERE id_staff = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    /*
     * Lee todos los alumnos asignados al staff seleccionado.
     * Retorna el nombre completo de los alumnos y su edad.
     */
    public function readAllAlumnosStaff()
    {
        $sql = "SELECT foto_alumno, CONCAT(nombre_alumno, ' ', apellido_alumno) AS nombre_alumnos, TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS 'edad', 
                CONCAT(nombre_cliente, ' ', apellido_cliente) AS nombre_clientes
                FROM tb_alumnos INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
                INNER JOIN tb_staffs USING (id_staff) 
                INNER JOIN tb_clientes USING (id_cliente) 
                WHERE id_staff = ?
                GROUP BY nombre_alumnos
                ORDER BY id_staff;";
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    //Función para generar reporte de todos los miembros del staff y la categoría de la que son encargados
    //En caso de que no tenga una categoría asignada, se manda el valor 'Ninguna categoría', 
    //Se conectan mediante un LEFT JOIN para mostrar datos aunque en la base no se encuentren debido a la consulta
    public function readAllStaffReport()
{
    $sql = "SELECT 
                s.id_staff, 
                CONCAT(s.nombre_staff, ' ', s.apellido_staff) AS nombre_completo,
                COALESCE(ca.categoria, 'Ninguna categoría') AS categoria
            FROM tb_staffs AS s
            LEFT JOIN tb_staffs_categorias AS sc USING (id_staff)
            LEFT JOIN tb_categorias_horarios AS ch USING (id_categoria_horario)
            LEFT JOIN tb_categorias_alumnos AS ca USING (id_categoria_alumno)
            ORDER BY s.id_staff";
    return Database::getRows($sql);
}

}
?>