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
    protected $idnivel = null;
    protected $idhorariolugar = null;
    protected $imagencategoria = null;


    // Constante para establecer la ruta de las imágenes, tanto de niveles como de categorías.
    const RUTA_IMAGEN = '../../images/alumnos_categorias/';


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_nivel_entrenamiento, nivel_entrenamiento, descripcion_nivel, imagen_nivel
                FROM tb_niveles_entrenamientos
                WHERE nivel_entrenamiento LIKE ? OR descripcion_nivel LIKE ?
                ORDER BY id_nivel_entrenamiento';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }


    //Metodos para la inserción de datos de categorías de alumnos

    public function createRowAlumno()
    {
        $sql = 'INSERT INTO tb_categorias_alumnos(categoria, edad_maxima, id_nivel_entrenamiento, id_horario_lugar, imagen_categoria)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombrecategoria, $this->edadmaxima, $this->idnivel, $this->idhorariolugar, $this->imagencategoria);
        return Database::executeRow($sql, $params);
    }

    public function readAllAlumno()
    {
        $sql = "SELECT 
        ca.id_categoria_alumno, 
        ca.categoria, 
        ca.edad_maxima, 
        ne.nivel_entrenamiento, 
        CONCAT(le.nombre_lugar, ' ', he.dia_entrenamiento, ' ', TIME_FORMAT(he.hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(he.hor_fin, '%h:%i %p')) AS id_horario_lugar, 
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
        ORDER BY 
        ca.id_categoria_alumno";
        return Database::getRows($sql);
    }
    

    public function readOneAlumno()
    {
        $sql = 'SELECT id_categoria_alumno, categoria, edad_maxima, nivel_entrenamiento, id_horario_lugar, imagen_categoria
                FROM tb_categorias_alumnos
                INNER JOIN tb_niveles_entrenamientos USING(id_nivel_entrenamiento)
                INNER JOIN tb_horarios_lugares USING(id_horario_lugar)
                WHERE id_categoria_alumno = ?';
        $params = array($this->idcategoria);
        return Database::getRow($sql, $params);
    }


    public function updateRowAlumno()
    {
        $sql = 'UPDATE tb_categorias_alumnos
                SET imagen_categoria = ?, categoria = ?, edad_maxima = ?, id_nivel_entrenamiento = ?, id_horario_lugar = ?
                WHERE id_categoria_alumno = ?';
        $params = array($this->imagencategoria, $this->nombrecategoria, $this->edadmaxima, $this->idnivel, $this->idhorariolugar, $this->idcategoria);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowAlumno()
    {
        $sql = 'DELETE FROM tb_categorias_alumnos
                WHERE id_categoria_alumno = ?';
        $params = array($this->idcategoria);
        return Database::executeRow($sql, $params);
    }

    public function readAllHorariosCombo()
    {
        $sql = "SELECT 
    hl.id_horario_lugar,
    CONCAT(le.nombre_lugar, ' ', he.dia_entrenamiento, ' ', TIME_FORMAT(he.hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(he.hor_fin, '%h:%i %p')) AS horario
    FROM 
    tb_horarios_lugares hl
    JOIN 
    tb_lugares_entrenamientos le ON hl.id_lugar = le.id_lugar
    JOIN 
    tb_horarios_entrenamientos he ON hl.id_horario = he.id_horario;";
        return Database::getRows($sql);
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
}
