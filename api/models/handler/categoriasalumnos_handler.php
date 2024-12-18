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

    //Métodos para visualizar los datos de las categorías
    public function readAllAlumno()
    {
        $sql = "SELECT 
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento,
        imagen_categoria
        FROM 
        tb_categorias_alumnos
        INNER JOIN 
        tb_niveles_entrenamientos USING(id_nivel_entrenamiento)
        ORDER BY 
        id_categoria_alumno";
        return Database::getRows($sql);
    }

    //Categorías de alumnos ordenadas por edades, de mayor a menor
    public function readAllAlumnoCategoriasMayorMenor()
    {
        $sql = "SELECT 
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento,
        imagen_categoria
        FROM 
        tb_categorias_alumnos
        INNER JOIN 
        tb_niveles_entrenamientos USING(id_nivel_entrenamiento)
        ORDER BY 
        edad_maxima DESC";
        return Database::getRows($sql);
    }

    public function readAllAlumnoCategoriasMenorMayor()
    {
        $sql = "SELECT 
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento,
        imagen_categoria
        FROM 
        tb_categorias_alumnos
        INNER JOIN 
        tb_niveles_entrenamientos USING(id_nivel_entrenamiento)
        ORDER BY 
        edad_maxima ASC";
        return Database::getRows($sql);
    }


    public function readAllAlumnoCategoriasMasAlumnos()
    {
        $sql = "SELECT 
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento,
        imagen_categoria,
        COUNT(id_alumno) AS cantidad_alumnos
        FROM 
        tb_alumnos
        JOIN 
        tb_staffs_categorias USING(id_staff_categorias)
        JOIN 
        tb_categorias_horarios USING(id_categoria_horario)
        JOIN 
        tb_categorias_alumnos USING(id_categoria_alumno)
        JOIN 
        tb_niveles_entrenamientos USING(id_nivel_entrenamiento)
        GROUP BY 
        categoria
        ORDER BY 
        cantidad_alumnos DESC";
        return Database::getRows($sql);
    }

    public function readAllAlumnoCategoriasMenosAlumnos()
    {
        $sql = "SELECT 
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento,
        imagen_categoria,
        COUNT(id_alumno) AS cantidad_alumnos
        FROM 
        tb_alumnos
        JOIN 
        tb_staffs_categorias USING(id_staff_categorias)
        JOIN 
        tb_categorias_horarios USING(id_categoria_horario)
        JOIN 
        tb_categorias_alumnos USING(id_categoria_alumno)
        JOIN 
        tb_niveles_entrenamientos USING(id_nivel_entrenamiento)
        GROUP BY 
        categoria
        ORDER BY 
        cantidad_alumnos ASC";
        return Database::getRows($sql);
    }

    //Fin de las vistas ----------------------------------------------

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
        id_categoria_alumno, 
        categoria, 
        edad_minima,
        edad_maxima, 
        nivel_entrenamiento, 
        imagen_categoria
        FROM 
        tb_categorias_alumnos
        INNER JOIN 
        tb_niveles_entrenamientos USING(id_nivel_entrenamiento)
        WHERE id_nivel_entrenamiento = ?
        ORDER BY 
        categoria;";
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
        id_categoria_horario,
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

    //Vistas para la asignación de categorías de alumnos y horario de entrenamiento
    public function readAllAlumnosHorario()
    {
        $sql = "SELECT 
        id_categoria_horario,
        id_categoria_alumno, 
        categoria, 
        nivel_entrenamiento, 
        imagen_categoria,
        CONCAT(nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS id_horario_lugar,
        CONCAT(categoria, ', ', nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS asignacion
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

    //Ver horarios por orden de día y hora de entrenamiento
    public function readAllAlumnosHorario2()
    {
        $sql = "SELECT 
        id_categoria_horario,
        id_categoria_alumno, 
        categoria, 
        nivel_entrenamiento, 
        imagen_categoria,
        CONCAT(nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS id_horario_lugar,
        CONCAT(categoria, ', ', nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS asignacion
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
        ORDER BY FIELD(dia_entrenamiento, 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'), 
        hora_inicio";
        return Database::getRows($sql);
    }

    //Fin de las vistas--------------------------------

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
        $sql = "SELECT MAX(id_staff_categorias) AS id_categoria_alumno , categoria
FROM tb_staffs_categorias
INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
GROUP BY  categoria
ORDER BY id_staff_categorias;
";
        return Database::getRows($sql);
    }

    //Combobox que muestra los lugares de entrenamiento, tomando el id de cada registro y mostrando los datos en el formato: 
        // Nombre del lugar, día de entrenamiento, la hora de inicio y hora de finalización del entrenamiento.
    public function readAllHorariosCombo()
    {
        $sql = "SELECT 
    id_horario_lugar,
    CONCAT(nombre_lugar, ', ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS horario
    FROM 
    tb_horarios_lugares
    INNER JOIN 
    tb_lugares_entrenamientos USING(id_lugar)
   INNER JOIN 
    tb_horarios_entrenamientos USING(id_horario)";
        return Database::getRows($sql);
    }

    //Reporte parametrizado para saber los alumnos que se encuentran registrados dentro de la categoría seleccionada
    public function reportAlumnosCategoria()
    {
        $sql = "SELECT foto_alumno, CONCAT(nombre_alumno, ' ', apellido_alumno) as Nombre, 
                fecha_nacimiento,
                TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad,
                posicion_alumno 
                FROM tb_alumnos_categorias
                INNER JOIN tb_alumnos USING (id_alumno)
                INNER JOIN tb_staffs_categorias USING (id_staff_categorias)
                INNER JOIN tb_categorias_horarios USING (id_categoria_horario)
                INNER JOIN tb_categorias_alumnos USING (id_categoria_alumno)
                WHERE id_categoria_alumno = ?
                ORDER BY posicion_alumno";
        $params = array($this->idcategoria);
        return Database::getRows($sql, $params);
    }

    //Gráfico parametrizado para mostrar la cantidad de alumnos que están dentro de un rango de edades, rango el cual estará
    //definido por la categoría que se seleccione
    public function graphicAlumnosEdades()
    {
        $sql = 'WITH Edades AS (
    SELECT 
        TIMESTAMPDIFF(YEAR, a.fecha_nacimiento, CURDATE()) AS edad -- Convertimos las fechas de nacimiento a edad entera, tomando el año actual y el año de nacimiento del alumno
    FROM tb_alumnos_categorias
                INNER JOIN tb_alumnos a USING (id_alumno)
    INNER JOIN 
        tb_staffs_categorias sc USING (id_staff_categorias)
    INNER JOIN 
        tb_categorias_horarios ch USING (id_categoria_horario)
    WHERE 
        ch.id_categoria_alumno = ?
    )
    SELECT 
    edad, -- Se obtienen las edades
    COUNT(*) AS cantidad -- Se obtienen el total de alumnos que tienen las edades definidas.
    FROM 
    Edades
    GROUP BY 
    edad;';
        $params = array($this->idcategoria);
        return Database::getRows($sql, $params);
    }
}
