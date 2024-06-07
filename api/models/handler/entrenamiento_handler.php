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
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_horario_lugar, nombre_lugar, dia_entrenamiento, hora_inicio, hor_fin FROM tb_horarios_lugares
                INNER JOIN tb_horarios_entrenamientos USING(id_horario)
                INNER JOIN tb_lugares_entrenamientos USING(id_lugar)
                WHERE nombre_lugar LIKE ? OR dia_entrenamiento LIKE ? OR hora_inicio LIKE ? OR hor_fin LIKE ?
                ORDER BY id_horario';
        $params = array($value, $value, $value, $value);
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
        $sql = 'SELECT id_horario, dia_entrenamiento, hora_inicio, hor_fin
                FROM tb_horarios_entrenamientos
                ORDER BY id_horario';
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

    public function readAllLugaresHorarios()
    {
        $sql = 'SELECT id_horario_lugar, id_horario, id_lugar
                FROM tb_horarios_lugares
                ORDER BY id_horario_lugar';
        return Database::getRows($sql);
    }

    public function readOneLugaresHorarios()
    {
        $sql = 'SELECT id_horario_lugar, id_horario, id_lugar
                FROM tb_horarios_lugares
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
}
