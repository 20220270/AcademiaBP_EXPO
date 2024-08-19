<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CategoriasAlumnosHandler
{


    //variables para las categorías de alumnos
    protected $idcategoria = null;
    protected $nombrecategoria = null;
    protected $edadmaxima = null;
    protected $edadminima = null;
    protected $idnivel = null;
    protected $imagencategoria = null;

    //variables para las categorías de alumnos
    protected $idcategoriahorario = null;
    protected $idcategoriaa = null;
    protected $idhorario = null;


    // Constante para establecer la ruta de las imágenes, tanto de niveles como de categorías.
    const RUTA_IMAGEN = '../../images/alumnos_categorias/';


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT 
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento, 
        descripcion_nivel,
        imagen_nivel,
        imagen_categoria
        FROM 
        tb_categorias_alumnos
        INNER JOIN 
        tb_niveles_entrenamientos USING (id_nivel_entrenamiento)
        WHERE categoria LIKE ? OR nivel_entrenamiento LIKE ?
        ORDER BY 
        id_categoria_alumno;";
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }


    //Metodos para la inserción de datos de categorías de alumnos

    public function createRowAlumno()
    {
        $sql = 'INSERT INTO tb_categorias_alumnos(categoria, edad_minima, edad_maxima, id_nivel_entrenamiento, imagen_categoria)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombrecategoria, $this->edadminima, $this->edadmaxima, $this->idnivel, $this->imagencategoria);
        return Database::executeRow($sql, $params);
    }

    public function readAllAlumno()
    {
        $sql = "SELECT 
        ca.id_categoria_alumno, 
        ca.categoria, 
        ca.edad_minima,
        ca.edad_maxima, 
        ne.nivel_entrenamiento,
        ca.imagen_categoria
        FROM 
        tb_categorias_alumnos ca
        INNER JOIN 
        tb_niveles_entrenamientos ne ON ca.id_nivel_entrenamiento = ne.id_nivel_entrenamiento
        ORDER BY 
        ca.id_categoria_alumno";
        return Database::getRows($sql);
    }


    public function readOneAlumno()
    {
        $sql = 'SELECT id_categoria_alumno, categoria, edad_minima, edad_maxima, id_nivel_entrenamiento, imagen_categoria
                FROM tb_categorias_alumnos
                INNER JOIN tb_niveles_entrenamientos USING(id_nivel_entrenamiento)
                WHERE id_categoria_alumno = ?';
        $params = array($this->idcategoria);
        return Database::getRow($sql, $params);
    }


    public function updateRowAlumno()
    {
        $sql = 'UPDATE tb_categorias_alumnos
                SET imagen_categoria = ?, categoria = ?, edad_minima = ?, edad_maxima = ?, id_nivel_entrenamiento = ?
                WHERE id_categoria_alumno = ?';
        $params = array($this->imagencategoria, $this->nombrecategoria, $this->edadminima, $this->edadmaxima, $this->idnivel, $this->idcategoria);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowAlumno()
    {
        $sql = 'DELETE FROM tb_categorias_alumnos
                WHERE id_categoria_alumno = ?';
        $params = array($this->idcategoria);
        return Database::executeRow($sql, $params);
    }

    public function readNivelesAlumnos()
    {
        $sql = "SELECT id_nivel_entrenamiento, nivel_entrenamiento FROM tb_niveles_entrenamientos
        ORDER BY 
        id_nivel_entrenamiento;";
        return Database::getRows($sql);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_categoria
                FROM tb_categorias_alumnos
                WHERE id_categoria_alumno = ?';
        $params = array($this->idcategoria);
        return Database::getRow($sql, $params);
    }

    public function readAllAlumnosCategs()
    {
        $sql = "SELECT 
        ca.id_categoria_alumno, 
        ca.categoria, 
        ca.edad_minima,
        ca.edad_maxima, 
        ne.nivel_entrenamiento, 
        ca.imagen_categoria
        FROM 
        tb_categorias_alumnos ca
        INNER JOIN 
        tb_niveles_entrenamientos ne ON ca.id_nivel_entrenamiento = ne.id_nivel_entrenamiento
        INNER JOIN 
        tb_horarios_lugares hl ON ca.id_horario_lugar = hl.id_horario_lugar
        INNER JOIN 
        tb_lugares_entrenamientos le ON hl.id_lugar = le.id_lugar
        INNER JOIN 
        tb_horarios_entrenamientos he ON hl.id_horario = he.id_horario
        WHERE ne.id_nivel_entrenamiento = ?
        ORDER BY 
        ca.categoria;";
        $params = array($this->idnivel);
        return Database::getRows($sql, $params);
    }

    //Reporte general de las categorías de alumnos

    public function readAllCategoriasReport()
    {
        $sql = "SELECT 
        id_categoria_alumno, 
        categoria, 
        CONCAT(edad_minima, '-' ,edad_maxima) as 'rango_edades', 
        nivel_entrenamiento,
        CONCAT(nombre_lugar, ', ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS id_horario_lugar
        FROM 
        tb_categorias_horarios
        INNER JOIN 
        tb_categorias_alumnos USING (id_categoria_alumno)
       INNER JOIN 
        tb_niveles_entrenamientos USING (id_nivel_entrenamiento)
        INNER JOIN 
        tb_horarios_lugares USING (id_horario_lugar)
        INNER JOIN 
        tb_lugares_entrenamientos USING (id_lugar)
        INNER JOIN 
        tb_horarios_entrenamientos USING (id_horario)
        ORDER BY 
        categoria;";
        return Database::getRows($sql);
    }



    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete). Horarios y categorias
     */
    public function searchRowsAlumnosHorario()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT 
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento, 
       descripcion_nivel,
        imagen_nivel,
        imagen_categoria,
        CONCAT(nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS id_horario_lugar
        FROM 
        tb_categorias_horarios
		INNER JOIN 
        tb_categorias_alumnos USING (id_categoria_alumno)
        INNER JOIN 
        tb_niveles_entrenamientos USING (id_nivel_entrenamiento)
        INNER JOIN 
        tb_horarios_lugares USING (id_horario_lugar)
        INNER JOIN 
        tb_lugares_entrenamientos USING (id_lugar)
        INNER JOIN 
        tb_horarios_entrenamientos USING (id_horario)
        WHERE categoria LIKE ? OR CONCAT(nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) LIKE ?;";
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }


    //Metodos para la inserción de datos de categorías de alumnos

    public function createRowAlumnosHorario()
    {
        $sql = 'INSERT INTO tb_categorias_horarios(id_categoria_alumno, id_horario_lugar)
                VALUES(?, ?)';
        $params = array($this->idcategoriaa, $this->idhorario);
        return Database::executeRow($sql, $params);
    }

    public function readAllAlumnosHorario()
    {
        $sql = "SELECT 
        id_categoria_horario,
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento, 
       descripcion_nivel,
        imagen_nivel,
        imagen_categoria,
        CONCAT(nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS id_horario_lugar
        FROM 
        tb_categorias_horarios
		INNER JOIN 
        tb_categorias_alumnos USING (id_categoria_alumno)
        INNER JOIN 
        tb_niveles_entrenamientos USING (id_nivel_entrenamiento)
        INNER JOIN 
        tb_horarios_lugares USING (id_horario_lugar)
        INNER JOIN 
        tb_lugares_entrenamientos USING (id_lugar)
        INNER JOIN 
        tb_horarios_entrenamientos USING (id_horario)";
        return Database::getRows($sql);
    }


    public function readOneAlumnosHorario()
    {
        $sql = 'SELECT id_categoria_horario, id_categoria_alumno, id_horario_lugar
                FROM tb_categorias_horarios
                INNER JOIN tb_categorias_alumnos USING(id_categoria_alumno)
                INNER JOIN tb_horarios_lugares USING(id_horario_lugar)
                WHERE id_categoria_horario = ?';
        $params = array($this->idcategoriahorario);
        return Database::getRow($sql, $params);
    }


    public function updateRowAlumnosHorario()
    {
        $sql = 'UPDATE tb_categorias_horarios
                SET id_categoria_alumno = ?, id_horario_lugar = ?
                WHERE id_categoria_horario = ?';
        $params = array($this->idcategoriaa, $this->idhorario, $this->idcategoriahorario);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowAlumnosHorario()
    {
        $sql = 'DELETE FROM tb_categorias_horarios
                WHERE id_categoria_horario = ?';
        $params = array($this->idcategoriahorario);
        return Database::executeRow($sql, $params);
    }

    public function readCategoriasAlumnos()
    {
        $sql = "SELECT id_categoria_alumno, categoria FROM tb_categorias_alumnos
        ORDER BY 
        id_categoria_alumno;";
        return Database::getRows($sql);
    }

    public function readAllHorariosCombo()
    {
        $sql = "SELECT 
    hl.id_horario_lugar,
    CONCAT(le.nombre_lugar, ', ', he.dia_entrenamiento, ' ', TIME_FORMAT(he.hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(he.hor_fin, '%h:%i %p')) AS horario
    FROM 
    tb_horarios_lugares hl
    INNER JOIN 
    tb_lugares_entrenamientos le ON hl.id_lugar = le.id_lugar
   INNER JOIN 
    tb_horarios_entrenamientos he ON hl.id_horario = he.id_horario;";
        return Database::getRows($sql);
    }

    public function reportAlumnosCategoria()
    {
        $sql = "SELECT foto_alumno, CONCAT(nombre_alumno, ' ', apellido_alumno) as Nombre, 
                fecha_nacimiento,
                TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad,
                posicion_alumno 
                FROM tb_alumnos
                INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
                INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                WHERE id_categoria_alumno = ?
                ORDER BY posicion_alumno";
        $params = array($this->idcategoria);
        return Database::getRows($sql, $params);
    }

    public function graphicAlumnosEdades()
    {
        $sql = 'WITH Edades AS (
    SELECT 
        TIMESTAMPDIFF(YEAR, a.fecha_nacimiento, CURDATE()) AS edad
    FROM 
        tb_alumnos a
    INNER JOIN 
        tb_staffs_categorias sc USING (id_staff_categorias)
    INNER JOIN 
        tb_categorias_horarios ch USING (id_categoria_horario)
    WHERE 
        ch.id_categoria_alumno = ?
)
SELECT 
    edad,
    COUNT(*) AS cantidad
FROM 
    Edades
GROUP BY 
    edad;
';
        $params = array($this->idcategoria);
        return Database::getRows($sql, $params);
    }
}
