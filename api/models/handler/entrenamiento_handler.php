<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class EntrenamientoHandler
{
    const RUTA_IMAGEN = '../../images/lugares_entreno/';

    /*
     *  Declaración de atributos para el manejo de datos.
     */

    //Variables para los horarios de entramiento
    protected $idhorario = null;
    protected $diaentreno = null;
    protected $horainicio = null;
    protected $horafinalizacion = null;

    //Variables para los lugares de entramiento
    protected $idlugar = null;
    protected $nombrelugar = null;
    protected $imagenlugar = null;
    protected $direccionlugar = null;
    protected $urllugar = null;

    //Variables para la asignación de lugares y horarios de entramiento
    protected $idlugarhorario = null;
    protected $idhorarioo = null;
    protected $idlugarr = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */


    //Metodos para los horarios de entrenamiento
    public function searchRowsHorarios()
    {
    $value = '%' . Validator::getSearchValue() . '%';
    $sql = 'SELECT id_horario, dia_entrenamiento, hora_inicio, hor_fin FROM tb_horarios_entrenamientos
            WHERE dia_entrenamiento LIKE ?
            ORDER BY id_horario';
    $params = array($value);
    return Database::getRows($sql, $params);
    }

    public function searchRowsLugares()
    {
    $value = '%' . Validator::getSearchValue() . '%';
    $sql = 'SELECT id_lugar, nombre_lugar, imagen_lugar, direccion_lugar, URL_lugar FROM tb_lugares_entrenamientos
            WHERE nombre_lugar LIKE ?
            ORDER BY id_lugar';
    $params = array($value);
    return Database::getRows($sql, $params);
    }

    public function searchRowsHorariosLugares()
    {
    $value = '%' . Validator::getSearchValue() . '%';
    $sql = 'SELECT id_horario_lugar, id_horario, nombre_lugar, direccion_lugar, imagen_lugar, dia_entrenamiento, hora_inicio, hor_fin 
            FROM tb_horarios_lugares
            INNER JOIN tb_horarios_entrenamientos USING(id_horario)
            INNER JOIN tb_lugares_entrenamientos USING(id_lugar)
            WHERE nombre_lugar LIKE ? OR dia_entrenamiento LIKE ?
            ORDER BY id_horario';
    $params = array($value, $value);
    return Database::getRows($sql, $params);
    }




    public function createRowHorarios()
    {
        $sql = 'INSERT INTO tb_horarios_entrenamientos(dia_entrenamiento, hora_inicio, hor_fin)
                VALUES(?, ?, ?)';
        $params = array($this->diaentreno, $this->horainicio, $this->horafinalizacion);
        return Database::executeRow($sql, $params);
    }

    public function readAllHorarios()
    {
        $sql = "SELECT id_horario, dia_entrenamiento, hora_inicio, hor_fin, 
                CONCAT(dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS horario
                FROM tb_horarios_entrenamientos
                ORDER BY id_horario";
        return Database::getRows($sql);
    }

    public function readAllHorariosCombo()
    {
        $sql = "SELECT 
        id_horario, 
        CONCAT(dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS horario
        FROM 
        tb_horarios_entrenamientos
        ORDER BY 
        id_horario;";
        return Database::getRows($sql);
    }

    public function readOneHorarios()
    {
        $sql = 'SELECT id_horario, dia_entrenamiento, hora_inicio, hor_fin
                FROM tb_horarios_entrenamientos
                WHERE id_horario = ?';
        $params = array($this->idhorario);
        return Database::getRow($sql, $params);
    }

    public function updateRowHorarios()
    {
        $sql = 'UPDATE tb_horarios_entrenamientos
                SET dia_entrenamiento = ?, hora_inicio = ?, hor_fin = ?
                WHERE id_horario = ?';
        $params = array($this->diaentreno, $this->horainicio, $this->horafinalizacion, $this->idhorario);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowHorarios()
    {
        $sql = 'DELETE FROM tb_horarios_entrenamientos
                WHERE id_horario = ?';
        $params = array($this->idhorario);
        return Database::executeRow($sql, $params);
    }


    //Metodos para los lugares de entrenamiento

    public function createRowLugares()
    {
        $sql = 'INSERT INTO tb_lugares_entrenamientos(nombre_lugar, imagen_lugar, direccion_lugar, URL_lugar)
                VALUES(?, ?, ?, ?)';
        $params = array($this->nombrelugar, $this->imagenlugar, $this->direccionlugar, $this->urllugar);
        return Database::executeRow($sql, $params);
    }

    public function readAllLugares()
    {
        $sql = 'SELECT id_lugar, nombre_lugar, imagen_lugar, direccion_lugar, URL_lugar
                FROM tb_lugares_entrenamientos
                ORDER BY id_lugar';
        return Database::getRows($sql);
    }

    public function readOneLugares()
    {
        $sql = 'SELECT id_lugar, nombre_lugar, imagen_lugar, direccion_lugar, URL_lugar
                FROM tb_lugares_entrenamientos
                WHERE id_lugar = ?';
        $params = array($this->idlugar);
        return Database::getRow($sql, $params);
    }

    public function updateRowLugares()
    {
        $sql = 'UPDATE tb_lugares_entrenamientos
            SET imagen_lugar = ?, nombre_lugar = ?, direccion_lugar = ?, URL_lugar = ?
            WHERE id_lugar = ?';
        $params = array($this->imagenlugar, $this->nombrelugar, $this->direccionlugar, $this->urllugar, $this->idlugar);
        return Database::executeRow($sql, $params);
    }


    public function deleteRowLugares()
    {
        $sql = 'DELETE FROM tb_lugares_entrenamientos
                WHERE id_lugar = ?';
        $params = array($this->idlugar);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_lugar
                FROM tb_lugares_entrenamientos
                WHERE id_lugar = ?';
        $params = array($this->idlugar);
        return Database::getRow($sql, $params);
    }


    //Metodos para las asginación de lugares y horarios de entrenamiento


    public function createRowLugaresHorarios()
    {
        $sql = 'INSERT INTO tb_horarios_lugares(id_horario, id_lugar)
                VALUES(?, ?)';
        $params = array($this->idhorarioo, $this->idlugarr);
        return Database::executeRow($sql, $params);
    }

    //Métodos para mostrar los días de entrenamiento -------------------------------

    //Ordenarlos por ID
    public function readAllLugaresHorarios()
    {
        $sql = "SELECT id_horario_lugar, nombre_lugar, dia_entrenamiento, hora_inicio, hor_fin,
        CONCAT(nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS horariolugar FROM tb_horarios_lugares
                INNER JOIN tb_horarios_entrenamientos USING(id_horario)
                INNER JOIN tb_lugares_entrenamientos USING(id_lugar)
                ORDER BY id_horario_lugar";
        return Database::getRows($sql);
    }

    //Ordenarlos por día y por horario. Esta consulta va a mostrarlos en este orden:

    //1- Por el día de la semana, en el orden LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SÁBADO, DOMINGO
    //2- Por el horario de entrenamiento, de forma ascendente

    public function readAllLugaresHorarios2()
    {
        $sql = "SELECT id_horario_lugar, nombre_lugar, dia_entrenamiento, hora_inicio, hor_fin,
                CONCAT(nombre_lugar, ' ', dia_entrenamiento, ' ', TIME_FORMAT(hora_inicio, '%h:%i %p'), ' - ', TIME_FORMAT(hor_fin, '%h:%i %p')) AS horariolugar
                FROM tb_horarios_lugares
                INNER JOIN tb_horarios_entrenamientos USING(id_horario)
                INNER JOIN tb_lugares_entrenamientos USING(id_lugar)
                ORDER BY FIELD(dia_entrenamiento, 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'), 
                hora_inicio;"; //FIELD nos ayudará a clasificar los datos, ordenándolos por el día.
        return Database::getRows($sql);
    }
    
    // Fin de métodos para mostrar los días de entrenamiento -------------------------------

    public function readOneLugaresHorarios()
    {
        $sql = 'SELECT id_horario_lugar, id_lugar, id_horario FROM tb_horarios_lugares
                WHERE id_horario_lugar = ?';
        $params = array($this->idlugarhorario);
        return Database::getRow($sql, $params);
    }

    public function updateRowLugaresHorarios()
    {
        $sql = 'UPDATE tb_horarios_lugares
                SET id_lugar = ?, id_horario = ?
                WHERE id_horario_lugar = ?';
        $params = array($this->idlugarr, $this->idhorarioo, $this->idlugarhorario);
        return Database::executeRow($sql, $params);
    }

    public function deleteRowLugaresHorarios()
    {
        $sql = 'DELETE FROM tb_horarios_lugares
                WHERE id_horario_lugar = ?';
        $params = array($this->idlugarhorario);
        return Database::executeRow($sql, $params);
    }

    //Mostrar lugares y horarios de entrenamiento en el sitio publico
    //Esta consulta nos devuelve todos los horarios de entrenamiento separados por un enter, esto por cada lugar de entrenamiento
    //ya que están agrupados
    public function readAllHorariosLugares()
    {
        $sql = "SELECT id_lugar, nombre_lugar, imagen_lugar, URL_lugar,
                REPLACE(GROUP_CONCAT(CONCAT(dia_entrenamiento, ' ', hora_inicio, ' - ', hor_fin) ORDER BY dia_entrenamiento SEPARATOR ', '), ',', CHAR(10)) AS horarios
                FROM tb_horarios_lugares
                INNER JOIN tb_horarios_entrenamientos USING(id_horario)
                INNER JOIN tb_lugares_entrenamientos USING(id_lugar)
                GROUP BY id_lugar, nombre_lugar
                ORDER BY id_lugar;";
        return Database::getRows($sql);
    }
}
